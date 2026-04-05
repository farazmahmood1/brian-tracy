import React, { useRef, useLayoutEffect, Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Stars, Preload } from "@react-three/drei";
import { EarthScene } from "./Earth3D";

// Module-level visibility — bridges the React/Canvas boundary
let _globeVisible = true;
let _startLoop: (() => void) | null = null;

// Lives inside Canvas — self-scheduling loop that fully stops when off-screen.
// Unlike useFrame (fires every rAF even when idle), this schedules zero callbacks
// when the globe scrolls out of view, freeing the main thread for CSS animations.
const FrameDriver: React.FC = () => {
    const { invalidate } = useThree();
    const rafId = useRef(0);
    const running = useRef(false);
    const lastRender = useRef(0);

    useEffect(() => {
        let active = true;

        const tick = () => {
            if (!active || !_globeVisible) {
                running.current = false;
                return; // fully stops — no more rAF scheduling
            }
            const now = performance.now();
            if (now - lastRender.current >= 33) { // ~30fps cap
                lastRender.current = now;
                invalidate();
            }
            rafId.current = requestAnimationFrame(tick);
        };

        const start = () => {
            if (running.current || !active) return;
            running.current = true;
            rafId.current = requestAnimationFrame(tick);
        };

        // Expose start so IntersectionObserver can restart the loop
        _startLoop = start;
        start();

        return () => {
            active = false;
            _startLoop = null;
            cancelAnimationFrame(rafId.current);
        };
    }, [invalidate]);

    return null;
};

const isMobileGlobe = typeof window !== 'undefined' && window.innerWidth < 768;

const HeroGlobeScene: React.FC = () => {
    const scrollProxy = useRef({
        scale: 1,
        rotationSpeed: 0.02,
        positionX: 0,
        positionY: 0,
        positionZ: 0,
    });

    useLayoutEffect(() => {
        const isMobile = window.innerWidth < 768;
        const endPx = 1500;
        let lastScroll = -1;

        // Replace GSAP ScrollTrigger scrub with a lightweight native handler.
        // GSAP scrub: true on document.body registers a global listener that
        // fires on EVERY scroll pixel for the ENTIRE page, even 5000px down.
        // This native version stops processing once past the hero range.
        const onScroll = () => {
            const y = window.scrollY;
            if (y === lastScroll) return;
            lastScroll = y;

            if (y > endPx) return; // past hero — skip entirely

            const progress = Math.min(1, Math.max(0, y / endPx));
            const proxy = scrollProxy.current;
            proxy.scale = 1 + progress * (isMobile ? 0.3 : 0.8);
            proxy.positionZ = isMobile ? 0 : progress * 2;
            proxy.positionY = progress * (isMobile ? -0.5 : -1);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll(); // initial state

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <EarthScene proxy={scrollProxy} />

            {/* Sun from the right — matches shader SUN_DIR [6,2,2] */}
            <ambientLight intensity={0.10} />
            <directionalLight position={[6, 2, 2]} intensity={2.2} color="#fff5e8" />

            {/* Dense starfield — reduced on mobile to prevent GPU bottleneck */}
            <Stars
                radius={80}
                depth={60}
                count={isMobileGlobe ? 1500 : 6000}
                factor={5}
                saturation={0}
                fade
                speed={0.3}
            />
            {/* Medium stars */}
            <Stars
                radius={150}
                depth={100}
                count={isMobileGlobe ? 1200 : 5000}
                factor={3}
                saturation={0}
                fade
                speed={0.15}
            />
            {/* Tiny distant stars */}
            <Stars
                radius={250}
                depth={150}
                count={isMobileGlobe ? 800 : 4000}
                factor={1.5}
                saturation={0.1}
                fade
                speed={0.05}
            />
        </>
    );
};

const Loader: React.FC = () => null;

export const HeroGlobe: React.FC<{ className?: string }> = ({ className }) => {
    const divRef = useRef<HTMLDivElement>(null);

    // Stop Three.js rendering completely when the globe scrolls out of view.
    // When hidden: zero rAF callbacks, zero GPU draws — frees main thread for CSS animations.
    useEffect(() => {
        const el = divRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                _globeVisible = entry.isIntersecting;
                if (entry.isIntersecting && _startLoop) {
                    _startLoop(); // restart the render loop
                }
            },
            { threshold: 0.01, rootMargin: "50px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={divRef} className={className}>
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
                dpr={[1, 1.5]}
                style={{ background: "transparent" }}
                frameloop="demand"
            >
                <Suspense fallback={<Loader />}>
                    <FrameDriver />
                    <HeroGlobeScene />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default HeroGlobe;
