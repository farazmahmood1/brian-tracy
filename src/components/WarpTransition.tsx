import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export type WarpMode = "idle" | "warping_out" | "warping_in" | "charging";

interface WarpTransitionProps {
    mode: WarpMode;
    chargeProgress: number; // 0 to 100 (used during 'charging' phase)
}

export const WarpTransition = ({ mode, chargeProgress }: WarpTransitionProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Re-write to use refs for mutable state in animation loop
    return <CanvasLogic mode={mode} chargeProgress={chargeProgress} canvasRef={canvasRef} />;
};

const CanvasLogic = ({ mode, chargeProgress, canvasRef }: { mode: WarpMode, chargeProgress: number, canvasRef: React.RefObject<HTMLCanvasElement> }) => {
    const modeRef = useRef(mode);
    const progressRef = useRef(chargeProgress);

    useEffect(() => {
        modeRef.current = mode;
    }, [mode]);

    useEffect(() => {
        progressRef.current = chargeProgress;
    }, [chargeProgress]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w = window.innerWidth;
        let h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;

        const stars: { x: number; y: number; z: number }[] = [];
        const numStars = 1000;
        const centerX = w / 2;
        const centerY = h / 2;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * w - centerX,
                y: Math.random() * h - centerY,
                z: Math.random() * w
            });
        }

        let speed = modeRef.current === 'warping_in' ? 100 : 0.2;
        let opacity = modeRef.current === 'warping_in' ? 1 : 0;
        let frameId: number;

        const render = () => {
            const currentMode = modeRef.current;
            const currentProgress = progressRef.current;

            let targetSpeed = 0.2;
            let targetOpacity = 0;

            if (currentMode === 'idle') {
                targetSpeed = 0.2;
                targetOpacity = 0;
            } else if (currentMode === 'charging') {
                targetSpeed = 0.2 + (currentProgress / 100) * 20;
                targetOpacity = currentProgress / 100;
            } else if (currentMode === 'warping_out') {
                targetSpeed = 100;
                targetOpacity = 1;
            } else if (currentMode === 'warping_in') {
                targetSpeed = 0.2;
                targetOpacity = 0;
            }

            // Interpolate
            speed += (targetSpeed - speed) * 0.02; // Smoother acceleration
            opacity += (targetOpacity - opacity) * 0.05;

            // Clear
            ctx.clearRect(0, 0, w, h);

            // Overlay bg
            if (opacity > 0.01) {
                ctx.fillStyle = `rgba(0, 0, 0, ${opacity * 0.9})`;
                ctx.fillRect(0, 0, w, h);
            }

            ctx.lineWidth = 2;

            for (let i = 0; i < numStars; i++) {
                const s = stars[i];
                s.z -= speed;
                if (s.z <= 0) {
                    s.z = w;
                    s.x = Math.random() * w - centerX;
                    s.y = Math.random() * h - centerY;
                }

                const x = centerX + (s.x / s.z) * w;
                const y = centerY + (s.y / s.z) * h;

                const alpha = (1 - s.z / w) * opacity;
                if (alpha <= 0) continue;

                if (speed > 5) {
                    const tailLen = speed * 2;
                    const prevZ = s.z + tailLen;
                    const px = centerX + (s.x / prevZ) * w;
                    const py = centerY + (s.y / prevZ) * h;

                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                } else {
                    const size = (1 - s.z / w) * 2;
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            frameId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Only run once on mount, refs handle updates

    return <canvas ref={canvasRef} className="fixed inset-0 z-50 pointer-events-none" />;
};
