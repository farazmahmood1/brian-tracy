import React, { useRef, useMemo, MutableRefObject } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

// Sun from the right — creates day/night split matching reference
const SUN_DIR = new THREE.Vector3(1.0, 0.15, 0.2).normalize();

const TEXTURES = {
  earth: "/textures/earth_atmos_2048.jpg",
  night: "https://threejs.org/examples/textures/planets/earth_lights_2048.png",
  clouds: "/textures/earth_clouds_1024.png",
  normal: "/textures/earth_normal_2048.jpg",
  specular: "/textures/earth_specular_2048.jpg",
};

const VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec2 vUv;
  varying vec3 vViewDir;

  void main() {
    vNormal      = normalize(normalMatrix * normal);
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vViewDir     = normalize(cameraPosition - worldPos.xyz);
    vUv          = uv;
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  uniform sampler2D uDayMap;
  uniform sampler2D uNightMap;
  uniform sampler2D uSpecMap;
  uniform vec3      uSunDirection;

  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec2 vUv;
  varying vec3 vViewDir;

  void main() {
    vec3  N = normalize(vWorldNormal);
    vec3  V = normalize(vViewDir);
    vec3  sunDir = normalize(uSunDirection);
    float NdotL  = dot(N, sunDir);

    // ── Day/night blend ─────────────────────────────────────────────────
    float day = smoothstep(-0.02, 0.08, NdotL);

    // ── DAY SIDE — vivid, fully lit ─────────────────────────────────────
    vec3  dayTex = texture2D(uDayMap, vUv).rgb;
    float grey   = dot(dayTex, vec3(0.299, 0.587, 0.114));
    dayTex       = mix(vec3(grey), dayTex, 1.35);
    float diff   = clamp(NdotL * 1.5 + 0.1, 0.0, 1.0);
    vec3  dayLit = dayTex * diff;

    // Ocean specular glint (day only)
    float specMask = texture2D(uSpecMap, vUv).r;
    vec3  H        = normalize(sunDir + V);
    float spec     = pow(max(dot(N, H), 0.0), 80.0) * specMask;
    dayLit        += vec3(0.9, 0.95, 1.0) * spec * 0.35 * diff;

    // ── NIGHT SIDE — dark blue with golden city lights ──────────────────
    // Dark blue base from the day texture
    vec3 nightBase = dayTex * vec3(0.08, 0.10, 0.22);

    // Golden city lights
    vec3  nightTex = texture2D(uNightMap, vUv).rgb;
    float cityLum  = max(nightTex.r, max(nightTex.g, nightTex.b));
    float cityMask = smoothstep(0.08, 0.3, cityLum);
    vec3  cityGlow = nightTex * cityMask * vec3(1.0, 0.82, 0.4) * 2.5;
    cityGlow = clamp(cityGlow, 0.0, 1.0);

    vec3 nightLit = nightBase + cityGlow;

    // ── Blend day and night ─────────────────────────────────────────────
    vec3 color = mix(nightLit, dayLit, day);

    // ── Cyan atmospheric rim — stronger on night side ───────────────────
    float viewDot = abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
    float rim     = pow(1.0 - viewDot, 3.5);
    vec3  rimDay   = vec3(0.2, 0.5, 1.0) * 0.4;
    vec3  rimNight = vec3(0.0, 0.7, 1.0) * 0.7;
    color += mix(rimNight, rimDay, day) * rim;

    // ── Natural edge shadow — darken limb for depth ───────────────────
    float edgeFade = pow(viewDot, 0.4);
    color *= edgeFade;

    gl_FragColor = vec4(color, 1.0);
  }
`;

// ── Types ─────────────────────────────────────────────────────────────────
export interface SceneProxy {
  scale: number;
  rotationSpeed: number;
  positionX: number;
  positionY: number;
  positionZ: number;
}

interface EarthSceneProps {
  proxy?: MutableRefObject<SceneProxy>;
  showMarkers?: boolean;
}

// ── EarthScene ────────────────────────────────────────────────────────────
export const EarthScene: React.FC<EarthSceneProps> = ({ proxy, showMarkers = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const fallback = useRef<SceneProxy>({
    scale: 1, rotationSpeed: 0.02,
    positionX: 0, positionY: 0, positionZ: 0,
  });
  const activeProxy = proxy ?? fallback;

  const [dayMap, nightMap, cloudsMap, , specMap] = useLoader(
    THREE.TextureLoader,
    [TEXTURES.earth, TEXTURES.night, TEXTURES.clouds, TEXTURES.normal, TEXTURES.specular]
  );

  // Show Asia/Europe — similar to the reference view
  const INITIAL_ROT = -0.5;

  const earthUniforms = useMemo(
    () => ({
      uDayMap: { value: dayMap },
      uNightMap: { value: nightMap },
      uSpecMap: { value: specMap },
      uSunDirection: { value: SUN_DIR.clone() },
    }),
    [dayMap, nightMap, specMap]
  );

  useFrame(({ invalidate }) => {
    const g = groupRef.current;
    if (!g) return;
    g.rotation.y += 0.0003;
    if (cloudsRef.current) cloudsRef.current.rotation.y += 0.0005;
    const p = activeProxy.current;
    g.scale.setScalar(p.scale);
    g.position.set(p.positionX, p.positionY, p.positionZ);
    invalidate();
  });

  return (
    <group ref={groupRef} rotation={[0.15, INITIAL_ROT, -0.05]}>
      {/* Earth surface */}
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <shaderMaterial
          vertexShader={VERT}
          fragmentShader={FRAG}
          uniforms={earthUniforms}
        />
      </mesh>

      {/* Cloud layer — only visible on day side, fully transparent on night */}
      <mesh ref={cloudsRef} scale={1.005}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          uniforms={{
            uCloudMap: { value: cloudsMap },
            uSunDirection: { value: SUN_DIR.clone() },
          }}
          vertexShader={`
            varying vec2 vUv;
            varying vec3 vWorldNormal;
            void main() {
              vUv = uv;
              vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform sampler2D uCloudMap;
            uniform vec3 uSunDirection;
            varying vec2 vUv;
            varying vec3 vWorldNormal;
            void main() {
              float NdotL = dot(normalize(vWorldNormal), normalize(uSunDirection));
              float dayFactor = smoothstep(-0.02, 0.08, NdotL);
              vec4 cloud = texture2D(uCloudMap, vUv);
              gl_FragColor = vec4(cloud.rgb, cloud.a * 0.4 * dayFactor);
            }
          `}
        />
      </mesh>

      {/* Office location markers */}
      <group visible={!!showMarkers}>
        {[
          { lat: 40.7, lng: -74.0 },
          { lat: 31.5, lng: 74.3 },
        ].map((loc, i) => {
          const phi = (90 - loc.lat) * (Math.PI / 180);
          const theta = (loc.lng + 180) * (Math.PI / 180);
          const r = 2.52;
          const x = -(r * Math.sin(phi) * Math.cos(theta));
          const y = r * Math.cos(phi);
          const z = r * Math.sin(phi) * Math.sin(theta);
          return (
            <group key={i} position={[x, y, z]}>
              <mesh>
                <sphereGeometry args={[0.04, 12, 12]} />
                <meshBasicMaterial color="#00d4aa" />
              </mesh>
              <mesh>
                <sphereGeometry args={[0.08, 12, 12]} />
                <meshBasicMaterial color="#00d4aa" transparent opacity={0.3} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Inner atmosphere glow — front-facing ozone layer */}
      <mesh scale={1.015}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          vertexShader={`
            varying vec3 vNormal;
            varying vec3 vWorldNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 uSunDirection;
            varying vec3 vNormal;
            varying vec3 vWorldNormal;
            void main() {
              float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
              float rim = pow(fresnel, 2.5);
              // Cyan glow all around, brighter on edges
              vec3 col = vec3(0.0, 0.6, 1.0);
              gl_FragColor = vec4(col, rim * 0.35);
            }
          `}
          uniforms={{
            uSunDirection: { value: SUN_DIR.clone() },
          }}
        />
      </mesh>

      {/* Outer atmosphere glow — backside for wider halo */}
      <mesh scale={1.04}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.75 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
              gl_FragColor = vec4(0.0, 0.55, 1.0, intensity * 0.4);
            }
          `}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// ── Standalone Earth3D ────────────────────────────────────────────────────
const _Loader: React.FC = () => null;

export const Earth3D: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
      frameloop="demand"
    >
      <Suspense fallback={<_Loader />}>
        <ambientLight intensity={0.03} />
        <directionalLight position={[6, 2, 2]} intensity={2.2} color="#fff5e8" />
        <EarthScene />
      </Suspense>
    </Canvas>
  </div>
);

export default Earth3D;
