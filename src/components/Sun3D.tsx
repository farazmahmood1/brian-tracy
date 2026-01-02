import React, { useRef, useMemo, MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SceneProxy } from "./Earth3D";

// Procedural Sun Shader
const SunShader = {
    uniforms: {
        uTime: { value: 0 },
        uSurfaceColor: { value: new THREE.Color("#ffaa00") }, // Bright orange
        uCoreColor: { value: new THREE.Color("#ff2200") },    // Deep red/orange
    },
    vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform float uTime;
    uniform vec3 uSurfaceColor;
    uniform vec3 uCoreColor;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    // Simplex Noise implementation
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      // First corner
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;

      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      //   x0 = x0 - 0.0 + 0.0 * C.xxx;
      //   x1 = x0 - i1  + 1.0 * C.xxx;
      //   x2 = x0 - i2  + 2.0 * C.xxx;
      //   x3 = x0 - 1.0 + 3.0 * C.xxx;
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
      vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

      // Permutations
      i = mod289(i);
      vec4 p = permute( permute( permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      // Gradients: 7x7 points over a square, mapped onto an octahedron.
      // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
      float n_ = 0.142857142857; // 1.0/7.0
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      //Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      // Mix final noise value
      vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      // Rotate noise with time to simulate flow
      float noise1 = snoise(vPosition * 1.5 + vec3(uTime * 0.1));
      float noise2 = snoise(vPosition * 20.0 - vec3(uTime * 0.2)); // Finer detail
      
      // Combine noise layers
      float n = noise1 * 0.7 + noise2 * 0.2; // Weighted blend
      
      // Color mixing based on noise
      // Lighter areas = hotter (surface color), Darker = cooler (core color)
      vec3 color = mix(uCoreColor, uSurfaceColor, smoothstep(-0.3, 0.5, n));
      
      // Make it super bright via "HDR" attempt (simple multiplier)
      vec3 finalColor = color * 1.5; 

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
};

// Corona/Atmosphere Shader for the Sun (Glow)
const SunAtmosphereShader = {
    uniforms: {
        uColor: { value: new THREE.Color("#ffaa00") }, // Orange/Gold glow
        uOpacity: { value: 0.5 },
        uPower: { value: 2.0 },
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
        
        // Boost glow intensity
        float alpha = fresnel * uOpacity;
        
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
};

interface SunSceneProps {
    proxy?: MutableRefObject<SceneProxy>;
}

export const SunScene: React.FC<SunSceneProps> = ({ proxy }) => {
    const sunRef = useRef<THREE.Mesh>(null);
    const atmosphereRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // Internal proxy if none provided (e.g. for standalone testing)
    const internalProxy = useRef({
        scale: 1,
        rotationSpeed: 0.01,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
    });
    const activeProxy = proxy || internalProxy;

    const sunConfig = useMemo(
        () => ({
            ...SunShader,
            uniforms: THREE.UniformsUtils.clone(SunShader.uniforms),
        }),
        []
    );

    const atmosphereConfig = useMemo(
        () => ({
            ...SunAtmosphereShader,
            uniforms: THREE.UniformsUtils.clone(SunAtmosphereShader.uniforms),
        }),
        []
    );

    useFrame(({ clock, mouse }) => {
        const time = clock.getElapsedTime();
        const p = activeProxy.current;

        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = time;
        }

        if (sunRef.current) {
            // Sun rotation (slow spin)
            sunRef.current.rotation.y = time * 0.05;

            // Sync with proxy position (parallax)
            // Note: We might want slightly different mouse influence for Sun to feel unique? 
            // Keeping it consistent with Earth for smooth transition first.

            // Apply mouse influence (can copy logic from earth or simplify)
            // Simplification: We blindly follow proxy + basic mouse offset logic if we wanted 
            // But since p.positionX already includes mouse logic in Earth3D's original code?
            // Wait, Earth3D calculated mouse influence inside useFrame using `mouse` prop.
            // If `HeroGlobe` manages the proxy, it should ideally manage the mouse influence too, 
            // OR we replicate the mouse logic here.
            // Let's replicate Earth3D basic logic for now to ensure standalone works.

            const mouseX = mouse.x * 0.1; // Reduced influence
            const mouseY = mouse.y * 0.1;

            sunRef.current.position.x = p.positionX + mouseX;
            sunRef.current.position.y = p.positionY + mouseY;
            sunRef.current.position.z = p.positionZ;

            // Apply scale
            sunRef.current.scale.setScalar(p.scale);
        }

        // Atmosphere follows sun
        if (atmosphereRef.current && sunRef.current) {
            atmosphereRef.current.position.copy(sunRef.current.position);
            atmosphereRef.current.scale.setScalar(p.scale * 1.2); // Atmosphere slightly larger
        }
    });

    return (
        <group>
            {/* Main Sun Body */}
            <mesh ref={sunRef}>
                <sphereGeometry args={[2.5, 64, 64]} />
                <shaderMaterial
                    ref={materialRef}
                    {...sunConfig}
                />
            </mesh>

            {/* Glowing Atmosphere/Corona */}
            <mesh ref={atmosphereRef}>
                <sphereGeometry args={[2.5, 64, 64]} />
                <shaderMaterial
                    {...atmosphereConfig}
                    side={THREE.BackSide}
                    transparent
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Ambient light for sun specifically? Sun shouldn't be lit by external lights, it IS the light. 
                But using unlit shader (shaderMaterial handles its own output) so we are good.
            */}
        </group>
    );
};

// Standalone component for testing
export const Sun3D: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={className}>
            <Canvas
                camera={{ position: [0, 8], fov: 45 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
                dpr={[1, 2]}
                style={{ background: "transparent" }}
            >
                <SunScene />
            </Canvas>
        </div>
    );
};

export default Sun3D;
