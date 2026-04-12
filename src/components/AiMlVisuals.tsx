import { motion, useInView, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";


/* ─── Intersection-aware Canvas wrapper — 30fps cap for performance ─── */
const FrameThrottle = () => {
  const { invalidate } = useThree();
  useEffect(() => {
    let active = true;
    let lastRender = 0;
    const tick = () => {
      if (!active) return;
      const now = performance.now();
      if (now - lastRender >= 33) { // ~30fps
        lastRender = now;
        invalidate();
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => { active = false; };
  }, [invalidate]);
  return null;
};

const LazyCanvas = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "200px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible && (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 5], fov: 50 }}
          frameloop="demand"
          style={{ background: "transparent" }}
        >
          <FrameThrottle />
          {children}
        </Canvas>
      )}
    </div>
  );
};


/* ─── 3D Neural Brain — rotating particle sphere with connections ─── */
const NeuralBrainMesh = () => {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, connections } = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    // Distribute points on a sphere using fibonacci
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = ((1 + Math.sqrt(5)) / 2) * i * Math.PI * 2;
      const r = 1.8 + (Math.random() - 0.5) * 0.4;
      pos[i * 3] = Math.cos(theta) * radius * r;
      pos[i * 3 + 1] = y * r;
      pos[i * 3 + 2] = Math.sin(theta) * radius * r;
    }

    // Find connections between nearby points
    const conns: number[] = [];
    const threshold = 0.9;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          conns.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2],
          );
        }
      }
    }

    return { positions: pos, connections: new Float32Array(conns) };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[connections, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00d4aa" transparent opacity={0.12} />
      </lineSegments>

      {/* Particle nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#48f0e7" size={0.06} transparent opacity={0.9} sizeAttenuation />
      </points>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.1, 2.15, 64]} />
        <meshBasicMaterial color="#00d4aa" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const NeuralBrain3D = ({ className = "" }: { className?: string }) => (
  <LazyCanvas className={className}>
    <NeuralBrainMesh />
  </LazyCanvas>
);


/* ─── 3D Floating Data Cube — wireframe with inner particles ─── */
const DataCubeMesh = () => {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.2;
      outerRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.1;
    }
  });

  return (
    <group ref={outerRef}>
      {/* Outer wireframe cube */}
      <mesh>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshBasicMaterial color="#00d4aa" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Inner smaller cube */}
      <mesh rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshBasicMaterial color="#48f0e7" wireframe transparent opacity={0.1} />
      </mesh>

      {/* Inner particles */}
      <points ref={innerRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#48f0e7" size={0.03} transparent opacity={0.6} sizeAttenuation />
      </points>
    </group>
  );
};

export const DataCube3D = ({ className = "" }: { className?: string }) => (
  <LazyCanvas className={className}>
    <DataCubeMesh />
  </LazyCanvas>
);


/* ─── 3D DNA Helix — scroll-driven double helix ─── */
const HelixMeshRef = ({ progressRef }: { progressRef: React.RefObject<number> }) => {
  const groupRef = useRef<THREE.Group>(null);

  const { spheres, connections } = useMemo(() => {
    const count = 50;
    const s: { pos: [number, number, number]; strand: number }[] = [];
    const c: number[] = [];

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 5;
      const y = (i / count) * 5 - 2.5;
      const r = 0.8;

      const x1 = Math.cos(t) * r;
      const z1 = Math.sin(t) * r;
      const x2 = Math.cos(t + Math.PI) * r;
      const z2 = Math.sin(t + Math.PI) * r;

      s.push({ pos: [x1, y, z1], strand: 0 });
      s.push({ pos: [x2, y, z2], strand: 1 });

      if (i % 4 === 0) {
        c.push(x1, y, z1, x2, y, z2);
      }
    }

    return { spheres: s, connections: new Float32Array(c) };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const p = progressRef.current;
      const targetRotY = p * Math.PI * 3;
      const targetY = p * 4 - 2;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * delta * 3;
      groupRef.current.position.y += ((-targetY) - groupRef.current.position.y) * delta * 3;
    }
  });

  return (
    <group ref={groupRef}>
      {spheres.map((s, i) => (
        <mesh key={i} position={s.pos}>
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshBasicMaterial
            color={s.strand === 0 ? "#00d4aa" : "#48f0e7"}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[connections, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00d4aa" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
};

// Shared ref bridge — lets scroll update a ref without React re-renders
const useSmoothScrollProgress = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  const progressRef = useRef(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => { progressRef.current = v; });
  return progressRef;
};

export const DnaHelix3D = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useSmoothScrollProgress(containerRef);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "200px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {visible && (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 5], fov: 50 }}
          frameloop="demand"
          style={{ background: "transparent" }}
        >
          <FrameThrottle />
          <HelixMeshRef progressRef={progressRef} />
        </Canvas>
      )}
    </div>
  );
};


/* ─── 3D Orbiting Rings — atom-like structure ─── */
const OrbitRingsMesh = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.5;
    if (ring2Ref.current) ring2Ref.current.rotation.z = t * 0.3;
    if (ring3Ref.current) ring3Ref.current.rotation.z = t * 0.4;
    if (groupRef.current) groupRef.current.rotation.y = t * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Center sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#48f0e7" transparent opacity={0.6} />
      </mesh>
      {/* Glow */}
      <mesh>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#00d4aa" transparent opacity={0.1} />
      </mesh>

      {/* Ring 1 */}
      <mesh ref={ring1Ref} rotation={[1.2, 0.3, 0]}>
        <torusGeometry args={[1.6, 0.015, 8, 80]} />
        <meshBasicMaterial color="#00d4aa" transparent opacity={0.3} />
      </mesh>
      {/* Orbiting dot on ring 1 */}
      <mesh ref={ring1Ref}>
        <group>
          <mesh position={[1.6, 0, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#48f0e7" />
          </mesh>
        </group>
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref} rotation={[0.4, 1.2, 0]}>
        <torusGeometry args={[1.3, 0.015, 8, 80]} />
        <meshBasicMaterial color="#48f0e7" transparent opacity={0.2} />
      </mesh>

      {/* Ring 3 */}
      <mesh ref={ring3Ref} rotation={[0.8, 0.6, 1]}>
        <torusGeometry args={[1.0, 0.012, 8, 80]} />
        <meshBasicMaterial color="#126b66" transparent opacity={0.25} />
      </mesh>
    </group>
  );
};

export const OrbitRings3D = ({ className = "" }: { className?: string }) => (
  <LazyCanvas className={className}>
    <OrbitRingsMesh />
  </LazyCanvas>
);


/* ─── 3D Scroll-driven Wireframe Sphere ─── */
const WireSphereMeshRef = ({ progressRef }: { progressRef: React.RefObject<number> }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const targetRot = progressRef.current * Math.PI * 2;
      groupRef.current.rotation.y += (targetRot - groupRef.current.rotation.y) * delta * 3;
      groupRef.current.rotation.x += (targetRot * 0.3 - groupRef.current.rotation.x) * delta * 3;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial color="#00d4aa" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshBasicMaterial color="#48f0e7" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshBasicMaterial color="#48f0e7" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

export const WireSphere3D = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useSmoothScrollProgress(containerRef);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "200px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {visible && (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 5], fov: 50 }}
          frameloop="demand"
          style={{ background: "transparent" }}
        >
          <FrameThrottle />
          <WireSphereMeshRef progressRef={progressRef} />
        </Canvas>
      )}
    </div>
  );
};


/* ─── Reusable Particle Network — same quality rendering, different shapes ─── */
const ParticleNetworkMesh = ({
  generatePoints,
  connectionThreshold = 0.9,
  rotationSpeed = { x: 0.05, y: 0.15 },
  ringRadius,
}: {
  generatePoints: () => Float32Array;
  connectionThreshold?: number;
  rotationSpeed?: { x: number; y: number };
  ringRadius?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  const { positions, connections } = useMemo(() => {
    const pos = generatePoints();
    const count = pos.length / 3;
    const conns: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < connectionThreshold) {
          conns.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2], pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
        }
      }
    }
    return { positions: pos, connections: new Float32Array(conns) };
  }, [generatePoints, connectionThreshold]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed.y;
      groupRef.current.rotation.x += delta * rotationSpeed.x;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[connections, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00d4aa" transparent opacity={0.12} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#48f0e7" size={0.06} transparent opacity={0.9} sizeAttenuation />
      </points>
      {ringRadius && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[ringRadius, ringRadius + 0.05, 64]} />
          <meshBasicMaterial color="#00d4aa" transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

/* ─── Torus shape — SaaS (cloud/loop) ─── */
const torusPoints = () => {
  const count = 140;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const phi = (Math.random() - 0.5) * Math.PI * 0.8;
    const R = 1.4;
    const r = 0.5 + (Math.random() - 0.5) * 0.3;
    pos[i * 3] = (R + r * Math.cos(phi)) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi);
    pos[i * 3 + 2] = (R + r * Math.cos(phi)) * Math.sin(theta);
  }
  return pos;
};
export const CloudCluster3D = ({ className = "" }: { className?: string }) => (
  <LazyCanvas className={className}>
    <ParticleNetworkMesh generatePoints={torusPoints} connectionThreshold={0.7} rotationSpeed={{ x: 0.08, y: 0.12 }} />
  </LazyCanvas>
);

/* ─── Cube lattice — Enterprise (structured/corporate) ─── */
const cubePoints = () => {
  const size = 5;
  const count = size * size * size;
  const pos = new Float32Array(count * 3);
  let idx = 0;
  const spacing = 0.7;
  const offset = ((size - 1) * spacing) / 2;
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        pos[idx * 3] = x * spacing - offset + (Math.random() - 0.5) * 0.1;
        pos[idx * 3 + 1] = y * spacing - offset + (Math.random() - 0.5) * 0.1;
        pos[idx * 3 + 2] = z * spacing - offset + (Math.random() - 0.5) * 0.1;
        idx++;
      }
    }
  }
  return pos;
};
export const GridMatrix3D = ({ className = "" }: { className?: string }) => (
  <LazyCanvas className={className}>
    <ParticleNetworkMesh generatePoints={cubePoints} connectionThreshold={0.75} rotationSpeed={{ x: 0.04, y: 0.1 }} />
  </LazyCanvas>
);

/* ─── Double helix — Strategy (DNA/planning) ─── */
const helixPoints = () => {
  const count = 120;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 6;
    const y = (i / count) * 4 - 2;
    const strand = i % 2 === 0 ? 0 : Math.PI;
    const r = 1.0 + (Math.random() - 0.5) * 0.2;
    pos[i * 3] = Math.cos(t + strand) * r;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = Math.sin(t + strand) * r;
  }
  return pos;
};
export const StrategyCompass3D = ({ className = "" }: { className?: string }) => (
  <LazyCanvas className={className}>
    <ParticleNetworkMesh generatePoints={helixPoints} connectionThreshold={0.65} rotationSpeed={{ x: 0.03, y: 0.18 }} ringRadius={1.3} />
  </LazyCanvas>
);

/* ─── Flowing wave — UX Design (creative/organic) ─── */
const wavePoints = () => {
  const count = 150;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 4;
    const z = (Math.random() - 0.5) * 4;
    const y = Math.sin(x * 1.5) * Math.cos(z * 1.5) * 0.8 + (Math.random() - 0.5) * 0.3;
    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
  }
  return pos;
};
export const DesignMorph3D = ({ className = "" }: { className?: string }) => (
  <LazyCanvas className={className}>
    <ParticleNetworkMesh generatePoints={wavePoints} connectionThreshold={0.85} rotationSpeed={{ x: 0.06, y: 0.1 }} />
  </LazyCanvas>
);

/* ─── Cone/rocket — MVP (upward momentum) ─── */
const conePoints = () => {
  const count = 130;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = Math.random();
    const y = t * 3.5 - 1.5;
    const radius = (1 - t) * 1.5 + 0.1;
    const theta = Math.random() * Math.PI * 2;
    pos[i * 3] = Math.cos(theta) * radius * (0.8 + Math.random() * 0.4);
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = Math.sin(theta) * radius * (0.8 + Math.random() * 0.4);
  }
  return pos;
};
export const LaunchTrail3D = ({ className = "" }: { className?: string }) => (
  <LazyCanvas className={className}>
    <ParticleNetworkMesh generatePoints={conePoints} connectionThreshold={0.8} rotationSpeed={{ x: 0.03, y: 0.15 }} />
  </LazyCanvas>
);

/* ─── Cylinder — Mobile App (device-like) ─── */
const cylinderPoints = () => {
  const count = 130;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 3;
    const isEdge = Math.random() > 0.4;
    const r = isEdge ? 1.2 + (Math.random() - 0.5) * 0.15 : Math.random() * 1.0;
    pos[i * 3] = Math.cos(theta) * r;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = Math.sin(theta) * r;
  }
  return pos;
};
export const AppFrame3D = ({ className = "" }: { className?: string }) => (
  <LazyCanvas className={className}>
    <ParticleNetworkMesh generatePoints={cylinderPoints} connectionThreshold={0.8} rotationSpeed={{ x: 0.06, y: 0.12 }} ringRadius={1.4} />
  </LazyCanvas>
);

/* ─── Clustered graph — Social Media (network hubs) ─── */
const graphPoints = () => {
  const count = 130;
  const pos = new Float32Array(count * 3);
  // 5 hub centers
  const hubs = [
    [0, 0, 0], [1.5, 1, 0.5], [-1.2, 0.8, -0.8], [0.8, -1.3, 0.6], [-1, -0.5, 1.2],
  ];
  for (let i = 0; i < count; i++) {
    const hub = hubs[i % hubs.length];
    const spread = i < hubs.length ? 0 : 0.8;
    pos[i * 3] = hub[0] + (Math.random() - 0.5) * spread;
    pos[i * 3 + 1] = hub[1] + (Math.random() - 0.5) * spread;
    pos[i * 3 + 2] = hub[2] + (Math.random() - 0.5) * spread;
  }
  return pos;
};
export const SocialGraph3D = ({ className = "" }: { className?: string }) => (
  <LazyCanvas className={className}>
    <ParticleNetworkMesh generatePoints={graphPoints} connectionThreshold={0.7} rotationSpeed={{ x: 0.05, y: 0.13 }} />
  </LazyCanvas>
);

/* ─── Enterprise Architecture Terminal — decorative ─── */
export const EnterpriseArchBlock = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const lines = [
    { text: "$ forrof deploy --enterprise", color: "#48f0e7", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "⬡ Infrastructure", color: "#e0e0e0", indent: 0 },
    { text: "  ├── API Gateway .............. ✓ secured", color: "#00d4aa", indent: 0 },
    { text: "  ├── Microservices (12) ....... ✓ healthy", color: "#00d4aa", indent: 0 },
    { text: "  ├── Database Cluster ......... ✓ replicated", color: "#00d4aa", indent: 0 },
    { text: "  ├── Auth & SSO ............... ✓ integrated", color: "#00d4aa", indent: 0 },
    { text: "  └── CDN & Edge Cache ......... ✓ active", color: "#00d4aa", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "⬡ Compliance", color: "#e0e0e0", indent: 0 },
    { text: "  ├── SOC 2 Type II ............ ✓ certified", color: "#00d4aa", indent: 0 },
    { text: "  ├── GDPR ..................... ✓ compliant", color: "#00d4aa", indent: 0 },
    { text: "  └── Audit Logging ............ ✓ enabled", color: "#00d4aa", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "✓ All systems operational | uptime: 99.99%", color: "#48f0e7", indent: 0 },
  ];

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border border-border/40 bg-[#0a0f14] p-6 md:p-8 font-mono text-sm overflow-hidden relative"
    >
      <div className="flex gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
      </div>
      <div className="space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
          >
            <span style={{ color: line.color }}>{line.text}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="w-2 h-4 bg-accent/80 mt-2"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-[30px]" />
    </motion.div>
  );
};


/* ─── SaaS Terminal Block — decorative ─── */
export const SaasTerminalBlock = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const lines = [
    { text: "$ forrof build --saas --scale", color: "#48f0e7", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "⬡ SaaS Platform", color: "#e0e0e0", indent: 0 },
    { text: "  ├── Multi-tenant Core .......... ✓ isolated", color: "#00d4aa", indent: 0 },
    { text: "  ├── Subscription Engine ........ ✓ Stripe ready", color: "#00d4aa", indent: 0 },
    { text: "  ├── User Dashboard ............. ✓ responsive", color: "#00d4aa", indent: 0 },
    { text: "  ├── Admin Panel ................ ✓ role-based", color: "#00d4aa", indent: 0 },
    { text: "  └── REST & GraphQL APIs ........ ✓ documented", color: "#00d4aa", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "⬡ Scaling", color: "#e0e0e0", indent: 0 },
    { text: "  ├── Auto-scaling ............... ✓ configured", color: "#00d4aa", indent: 0 },
    { text: "  ├── Rate Limiting .............. ✓ enforced", color: "#00d4aa", indent: 0 },
    { text: "  └── Multi-region CDN ........... ✓ deployed", color: "#00d4aa", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "✓ Production ready | MRR tracking: active", color: "#48f0e7", indent: 0 },
  ];

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border border-border/40 bg-[#0a0f14] p-6 md:p-8 font-mono text-sm overflow-hidden relative"
    >
      <div className="flex gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
      </div>
      <div className="space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
          >
            <span style={{ color: line.color }}>{line.text}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="w-2 h-4 bg-accent/80 mt-2"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-[30px]" />
    </motion.div>
  );
};

/* ─── Strategy Terminal Block — decorative ─── */
export const StrategyTerminalBlock = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const lines = [
    { text: "$ forrof strategy --analyze", color: "#48f0e7", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "⬡ Market Assessment", color: "#e0e0e0", indent: 0 },
    { text: "  ├── Competitor Landscape ....... ✓ mapped", color: "#00d4aa", indent: 0 },
    { text: "  ├── User Research .............. ✓ 48 interviews", color: "#00d4aa", indent: 0 },
    { text: "  ├── Tech Stack Audit ........... ✓ documented", color: "#00d4aa", indent: 0 },
    { text: "  └── Risk Matrix ................ ✓ scored", color: "#00d4aa", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "⬡ Strategic Roadmap", color: "#e0e0e0", indent: 0 },
    { text: "  ├── Phase 1: Foundation ........ Q1 2026", color: "#48f0e7", indent: 0 },
    { text: "  ├── Phase 2: Scale ............. Q2 2026", color: "#48f0e7", indent: 0 },
    { text: "  ├── Phase 3: Optimize .......... Q3 2026", color: "#48f0e7", indent: 0 },
    { text: "  └── ROI Projection ............. +340%", color: "#48f0e7", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "✓ Strategy delivered | confidence: high", color: "#48f0e7", indent: 0 },
  ];

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border border-border/40 bg-[#0a0f14] p-6 md:p-8 font-mono text-sm overflow-hidden relative"
    >
      <div className="flex gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
      </div>
      <div className="space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
          >
            <span style={{ color: line.color }}>{line.text}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="w-2 h-4 bg-accent/80 mt-2"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-[30px]" />
    </motion.div>
  );
};

/* ─── UX Terminal Block — decorative ─── */
export const UxTerminalBlock = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const lines = [
    { text: "$ forrof design --ux --system", color: "#48f0e7", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "⬡ Design System", color: "#e0e0e0", indent: 0 },
    { text: "  ├── Typography Scale ........... ✓ defined", color: "#00d4aa", indent: 0 },
    { text: "  ├── Color Tokens ............... ✓ 42 tokens", color: "#00d4aa", indent: 0 },
    { text: "  ├── Component Library .......... ✓ 86 components", color: "#00d4aa", indent: 0 },
    { text: "  ├── Icon Set ................... ✓ 240 icons", color: "#00d4aa", indent: 0 },
    { text: "  └── Motion Guidelines .......... ✓ documented", color: "#00d4aa", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "⬡ User Testing", color: "#e0e0e0", indent: 0 },
    { text: "  ├── Usability Score ............ 94/100", color: "#48f0e7", indent: 0 },
    { text: "  ├── Task Completion ............ 97.2%", color: "#48f0e7", indent: 0 },
    { text: "  └── Accessibility (WCAG) ....... AA compliant", color: "#48f0e7", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "✓ Design system shipped | Figma + code synced", color: "#48f0e7", indent: 0 },
  ];

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border border-border/40 bg-[#0a0f14] p-6 md:p-8 font-mono text-sm overflow-hidden relative"
    >
      <div className="flex gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
      </div>
      <div className="space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
          >
            <span style={{ color: line.color }}>{line.text}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="w-2 h-4 bg-accent/80 mt-2"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-[30px]" />
    </motion.div>
  );
};

/* ─── MVP Terminal Block — decorative ─── */
export const MvpTerminalBlock = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const lines = [
    { text: "$ forrof launch --mvp --fast", color: "#48f0e7", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "⬡ MVP Pipeline", color: "#e0e0e0", indent: 0 },
    { text: "  ├── Idea Validation ............ ✓ 3 days", color: "#00d4aa", indent: 0 },
    { text: "  ├── Wireframes ................. ✓ 5 days", color: "#00d4aa", indent: 0 },
    { text: "  ├── Core Development ........... ✓ 4 weeks", color: "#00d4aa", indent: 0 },
    { text: "  ├── QA & Testing ............... ✓ automated", color: "#00d4aa", indent: 0 },
    { text: "  └── Production Deploy .......... ✓ live", color: "#00d4aa", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "⬡ Metrics", color: "#e0e0e0", indent: 0 },
    { text: "  ├── Time to Market ............. 6 weeks", color: "#48f0e7", indent: 0 },
    { text: "  ├── Core Features .............. 12 shipped", color: "#48f0e7", indent: 0 },
    { text: "  └── Investor Demo .............. ✓ ready", color: "#48f0e7", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "✓ MVP launched | feedback loop: active", color: "#48f0e7", indent: 0 },
  ];

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border border-border/40 bg-[#0a0f14] p-6 md:p-8 font-mono text-sm overflow-hidden relative"
    >
      <div className="flex gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
      </div>
      <div className="space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
          >
            <span style={{ color: line.color }}>{line.text}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="w-2 h-4 bg-accent/80 mt-2"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-[30px]" />
    </motion.div>
  );
};

/* ─── Mobile Terminal Block — decorative ─── */
export const MobileTerminalBlock = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const lines = [
    { text: "$ forrof build --mobile --cross-platform", color: "#48f0e7", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "⬡ Mobile App", color: "#e0e0e0", indent: 0 },
    { text: "  ├── iOS Build .................. ✓ App Store ready", color: "#00d4aa", indent: 0 },
    { text: "  ├── Android Build .............. ✓ Play Store ready", color: "#00d4aa", indent: 0 },
    { text: "  ├── Push Notifications ......... ✓ configured", color: "#00d4aa", indent: 0 },
    { text: "  ├── Offline Mode ............... ✓ enabled", color: "#00d4aa", indent: 0 },
    { text: "  └── Biometric Auth ............. ✓ Face ID + Touch", color: "#00d4aa", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "⬡ Performance", color: "#e0e0e0", indent: 0 },
    { text: "  ├── App Size ................... 12.4 MB", color: "#48f0e7", indent: 0 },
    { text: "  ├── Cold Start ................. 1.2s", color: "#48f0e7", indent: 0 },
    { text: "  └── Crash-free Rate ............ 99.8%", color: "#48f0e7", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "✓ Both platforms live | CI/CD: automated", color: "#48f0e7", indent: 0 },
  ];

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border border-border/40 bg-[#0a0f14] p-6 md:p-8 font-mono text-sm overflow-hidden relative"
    >
      <div className="flex gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
      </div>
      <div className="space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
          >
            <span style={{ color: line.color }}>{line.text}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="w-2 h-4 bg-accent/80 mt-2"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-[30px]" />
    </motion.div>
  );
};

/* ─── Social Media Terminal Block — decorative ─── */
export const SocialMediaTerminalBlock = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const lines = [
    { text: "$ forrof campaign --social --optimize", color: "#48f0e7", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "⬡ Content Pipeline", color: "#e0e0e0", indent: 0 },
    { text: "  ├── Brand Guidelines ........... ✓ locked", color: "#00d4aa", indent: 0 },
    { text: "  ├── Content Calendar ........... ✓ 90 days", color: "#00d4aa", indent: 0 },
    { text: "  ├── Visual Templates ........... ✓ 24 formats", color: "#00d4aa", indent: 0 },
    { text: "  ├── Copy Framework ............. ✓ tone mapped", color: "#00d4aa", indent: 0 },
    { text: "  └── Hashtag Strategy ........... ✓ researched", color: "#00d4aa", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "⬡ Analytics", color: "#e0e0e0", indent: 0 },
    { text: "  ├── Engagement Rate ............ +180%", color: "#48f0e7", indent: 0 },
    { text: "  ├── Follower Growth ............ +12K/mo", color: "#48f0e7", indent: 0 },
    { text: "  └── Conversion Tracking ........ ✓ linked", color: "#48f0e7", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "✓ Campaign live | reporting: real-time", color: "#48f0e7", indent: 0 },
  ];

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border border-border/40 bg-[#0a0f14] p-6 md:p-8 font-mono text-sm overflow-hidden relative"
    >
      <div className="flex gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
      </div>
      <div className="space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
          >
            <span style={{ color: line.color }}>{line.text}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="w-2 h-4 bg-accent/80 mt-2"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-[30px]" />
    </motion.div>
  );
};


/* ─── Animated Code Block — decorative ─── */
export const AiCodeBlock = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const lines = [
    { text: "model = ForrofAI.build(", color: "#e0e0e0", indent: 0 },
    { text: '  task="prediction",', color: "#48f0e7", indent: 1 },
    { text: '  data=pipeline.transform(raw_data),', color: "#48f0e7", indent: 1 },
    { text: '  architecture="transformer",', color: "#48f0e7", indent: 1 },
    { text: '  monitoring=True', color: "#48f0e7", indent: 1 },
    { text: ")", color: "#e0e0e0", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "results = model.deploy(", color: "#e0e0e0", indent: 0 },
    { text: '  env="production",', color: "#00d4aa", indent: 1 },
    { text: '  scaling="auto"', color: "#00d4aa", indent: 1 },
    { text: ")", color: "#e0e0e0", indent: 0 },
    { text: "", color: "", indent: 0 },
    { text: "# accuracy: 99.7% | latency: 12ms", color: "#666", indent: 0 },
  ];

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border border-border/40 bg-[#0a0f14] p-6 md:p-8 font-mono text-sm overflow-hidden relative"
    >
      <div className="flex gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
      </div>
      <div className="space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
          >
            <span className="text-white/20 mr-4 text-xs w-5 text-right select-none">{i + 1}</span>
            <span style={{ color: line.color, paddingLeft: `${line.indent * 20}px` }}>{line.text}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="w-2 h-4 bg-accent/80 mt-2 ml-9"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-[30px]" />
    </motion.div>
  );
};
