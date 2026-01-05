import React, { useRef, useLayoutEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Stars, Preload } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EarthScene } from "./Earth3D";

gsap.registerPlugin(ScrollTrigger);

import { useTheme } from "@/context/ThemeContext";

const HeroGlobeScene: React.FC<{ isLightMode: boolean }> = ({ isLightMode }) => {
    const scrollProxy = useRef({
        scale: 1,
        rotationSpeed: 0.02,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
    });

    // Setup GSAP ScrollTrigger
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const isMobile = window.innerWidth < 768;

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

    return (
        <>
            {/* Earth Group */}
            <group>
                <EarthScene proxy={scrollProxy} />
            </group>

            {/* Lighting - Adjusted based on theme */}
            <ambientLight intensity={isLightMode ? 2.5 : 0.15} />
            <directionalLight
                position={[10, 5, 5]}
                intensity={isLightMode ? 4.5 : 2.5}
                color="#fff5f0"
                castShadow
            />
            <pointLight position={[-15, -10, -10]} intensity={isLightMode ? 2.5 : 0.8} color="#4477ff" />
            <pointLight position={[0, 10, 5]} intensity={isLightMode ? 2.5 : 0.5} color="#ffffff" />

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
    const { theme } = useTheme();
    const [isLightMode, setIsLightMode] = React.useState(false);

    React.useEffect(() => {
        const checkTheme = () => {
            if (theme === "system") {
                setIsLightMode(!window.matchMedia("(prefers-color-scheme: dark)").matches);
            } else {
                setIsLightMode(theme === "light");
            }
        };

        checkTheme();

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => checkTheme();
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

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
                    <HeroGlobeScene isLightMode={isLightMode} />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default HeroGlobe;
