import React, { useRef, useLayoutEffect, useMemo, Suspense, MutableRefObject } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Stars, Preload } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// High-Res Earth Textures
const TEXTURES = {
  earth: "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
  earthNormal:
    "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg",
  earthSpec:
    "https://threejs.org/examples/textures/planets/earth_specular_2048.jpg",
  clouds: "https://threejs.org/examples/textures/planets/earth_clouds_1024.png",
};


// Atmospheric Scattering Shader
const AtmosphereShader = {
  uniforms: {
    uColor: { value: new THREE.Color("#88ccff") },
    uOpacity: { value: 0.08 },
    uPower: { value: 3.5 },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uPower;
    void main() {
      vec3 viewDirection = normalize(-vPosition);
      float fresnel = pow(1.0 - dot(vNormal, viewDirection), uPower);
      gl_FragColor = vec4(uColor, fresnel * uOpacity);
    }
  `,
};

// ... imports
import { Mesh, RingGeometry, ShaderMaterial, DoubleSide } from "three";

export interface SceneProxy {
  scale: number;
  rotationSpeed: number;
  positionX: number;
  positionY: number;
  positionZ: number;
  orbitRotation: number; // New: Controls the manual rotation (simulating camera orbit)
  trailProgress: number; // New: 0 to 1, controls the trail length
}

// ... existing code ...

// Helper for trail with Shader
const ManualTrail = ({ proxy }: { proxy: React.MutableRefObject<SceneProxy> }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Custom shader for a glowing trail with fade
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uProgress: { value: 0 },
      uColor: { value: new THREE.Color("#ffffff") },
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `,
    fragmentShader: `
        uniform float uProgress;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
            // uProgress controls length/opacity
            // Mask out based on radial or angular?
            // Let's make it simple: Progress controls overall opacity + length
            
            // Angular fade (0 to 1 around the ring)
            float angle = vUv.y; 
            
            // Trail length logic: 
            // We want a "head" at angle = 1 (or rotating) and tail behind.
            // But here we are rotating the mesh z.
            // So just a static gradients + opacity control is enough.
            
            float alpha = smoothstep(0.0, 0.5, angle) * (1.0 - smoothstep(0.8, 1.0, angle));
            
            // Glow from center
            float glow = 1.0 - abs(vUv.x - 0.5) * 2.0;
            glow = pow(glow, 4.0); // sharp glow
            
            gl_FragColor = vec4(uColor, glow * alpha * uProgress);
        }
        `,
    transparent: true,
    side: DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  useFrame(() => {
    if (!meshRef.current) return;
    const p = proxy.current;

    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uProgress.value = p.trailProgress;

    // Rotate z to animate the "breaking" line movement
    meshRef.current.rotation.z += 0.02 + (p.trailProgress * 0.05);
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]} scale={3.5}>
      {/* RingGeometry: inner, outer, thetaSegments */}
      <ringGeometry args={[1.0, 1.01, 128]} />
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  );
};

// Earth Scene Component
interface EarthSceneProps {
  proxy?: React.MutableRefObject<SceneProxy>;
}

export const EarthScene: React.FC<EarthSceneProps> = ({ proxy }) => {
  const earthRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.ShaderMaterial>(null);

  // Internal proxy fallback if none provided
  const internalProxy = useRef({
    scale: 1,
    rotationSpeed: 0.02,
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    orbitRotation: 0,
    trailProgress: 0,
  });

  // Use provided proxy or fallback to internal
  const activeProxy = proxy || internalProxy;

  // Track previous rotation for delta
  const prevOrbitRotation = useRef(0);

  const [earthMap, earthNormal, earthSpec, cloudsMap] = useLoader(
    THREE.TextureLoader,
    [TEXTURES.earth, TEXTURES.earthNormal, TEXTURES.earthSpec, TEXTURES.clouds]
  );

  // ... shader config ...
  const atmosphereConfig = useMemo(
    () => ({
      ...AtmosphereShader,
      uniforms: THREE.UniformsUtils.clone(AtmosphereShader.uniforms),
    }),
    []
  );

  useLayoutEffect(() => {
    // Only set up internal GSAP if no external proxy is provided
    if (proxy) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Parallax scroll animation
      gsap.to(activeProxy.current, {
        scale: isMobile ? 1.3 : 1.8,
        positionZ: isMobile ? 0 : 2,
        positionY: isMobile ? -0.5 : -1,
        rotationSpeed: 0.02, // slower on scroll too
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=1500",
          scrub: 1.5,
        },
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [proxy]);

  useFrame(({ clock, mouse }) => {
    const time = clock.getElapsedTime();
    const p = activeProxy.current;

    // Update main group transform
    if (earthRef.current) {
      // Position/Scale
      earthRef.current.scale.setScalar(p.scale);
      earthRef.current.position.set(p.positionX, p.positionY, p.positionZ);

      // Rotation: Auto + Manual Orbit
      earthRef.current.rotation.y = (time * p.rotationSpeed) + p.orbitRotation;
    }

    if (cloudsRef.current) {
      // Clouds move slightly faster
      cloudsRef.current.rotation.y = (time * (p.rotationSpeed + 0.005)) + p.orbitRotation;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <group ref={earthRef}>
        {/* Main Earth Sphere */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[2.5, 64, 64]} />
          <meshStandardMaterial
            map={earthMap}
            normalMap={earthNormal}
            roughnessMap={earthSpec}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* Cloud Layer */}
        <mesh ref={cloudsRef} scale={1.02}>
          <sphereGeometry args={[2.5, 64, 64]} />
          <meshStandardMaterial
            map={cloudsMap}
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </mesh>

        {/* Subtle Atmospheric Glow */}
        <mesh scale={1.03}>
          <sphereGeometry args={[2.5, 64, 64]} />
          <shaderMaterial
            ref={atmosphereRef}
            {...atmosphereConfig}
            side={THREE.BackSide}
            transparent
          />
        </mesh>
      </group>

      {/* The Orbit/Trail Ring (Rotated to be diagonal) */}
      <group rotation={[Math.PI / 3, 0, 0]}>
        <ManualTrail proxy={activeProxy} />
      </group>
    </group>
  );
};

// ... Loader, Earth3D export


// Fallback loader component
const Loader: React.FC = () => {
  return null;
};

// Main Earth3D Component
export const Earth3D: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        frameloop="always"
      >
        <Suspense fallback={<Loader />}>
          {/* Lighting needed for standalone */}
          <ambientLight intensity={0.15} />
          <directionalLight
            position={[10, 5, 5]}
            intensity={2.5}
            color="#fff5f0"
            castShadow
          />
          <pointLight position={[-15, -10, -10]} intensity={0.8} color="#4477ff" />
          <pointLight position={[0, 10, 5]} intensity={0.5} color="#ffffff" />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />
          <EarthScene />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Earth3D;
