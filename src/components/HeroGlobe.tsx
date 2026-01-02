import React, { useRef, useLayoutEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Stars, Preload } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";
import { EarthScene } from "./Earth3D";
import { SunScene } from "./Sun3D";

gsap.registerPlugin(ScrollTrigger);

const HeroGlobeScene: React.FC = () => {
    const { theme } = useTheme();

    // Helper to resolve effective theme
    const isLight = useMemo(() => {
        if (theme === 'system') {
            return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches;
        }
        return theme === 'light';
    }, [theme]);

    const scrollProxy = useRef({
        scale: 1,
        rotationSpeed: 0.02,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
    });

    // Setup GSAP ScrollTrigger (Shared logic)
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const isMobile = window.innerWidth < 768;

            // Initial State - removed incorrect overrides
            // scrollProxy defaults are correct (scale: 1, pos: 0)

            gsap.to(scrollProxy.current, {
                scale: isMobile ? 1.3 : 1.8,
                positionZ: isMobile ? 0 : 2,
                positionY: isMobile ? -0.5 : -1,
                rotationSpeed: 0.02,
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "+=1500",
                    scrub: 1.5,
                },
            });
        });
        return () => ctx.revert();
    }, []);

    // Transition State (0 = Dark/Earth, 1 = Light/Sun)
    const transitionRef = useRef(isLight ? 1 : 0);
    const earthGroupRef = useRef<THREE.Group>(null);
    const sunGroupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        // 1. Interpolate transition
        const target = isLight ? 1 : 0;
        // Smooth lerp for transition
        transitionRef.current = THREE.MathUtils.lerp(transitionRef.current, target, delta * 3); // Adjust speed

        const t = transitionRef.current;
        const width = 15; // Distance to move sideways

        // 2. Animate Groups
        // Earth: Active at 0. Moving to Right (+) as t -> 1
        // Sun: Active at 1. Coming from Left (-) as t -> 1 (or from behind?)

        if (earthGroupRef.current) {
            earthGroupRef.current.position.x = t * width; // 0 -> 15
        }

        if (sunGroupRef.current) {
            sunGroupRef.current.position.x = (t - 1) * width; // -15 -> 0
        }
    });

    return (
        <>
            {/* Earth Group */}
            <group ref={earthGroupRef}>
                <EarthScene proxy={scrollProxy} />
            </group>

            {/* Sun Group */}
            <group ref={sunGroupRef}>
                <SunScene proxy={scrollProxy} />
            </group>

            {/* Lighting */}
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
        </>
    );
};

// Fallback loader component
const Loader: React.FC = () => {
    return null;
};

export const HeroGlobe: React.FC<{ className?: string }> = ({ className }) => {
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
                    <HeroGlobeScene />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default HeroGlobe;
