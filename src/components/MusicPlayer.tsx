import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const wasPlayingBeforeInterruption = useRef(false);

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio(`${import.meta.env.VITE_SERVER}/space-440026.mp3`);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        // Custom event listeners
        const handlePause = () => {
            if (audioRef.current && !audioRef.current.paused) {
                wasPlayingBeforeInterruption.current = true;
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                // If it's already paused, we don't want to auto-resume later
                // unless we are in a nested state, but for now simple toggle:
                wasPlayingBeforeInterruption.current = false;
            }
        };

        const handleResume = () => {
            if (wasPlayingBeforeInterruption.current && audioRef.current) {
                audioRef.current.play().catch(console.error);
                setIsPlaying(true);
            }
            // Reset the flag
            wasPlayingBeforeInterruption.current = false;
        };

        window.addEventListener("music:pause", handlePause);
        window.addEventListener("music:resume", handleResume);

        return () => {
            window.removeEventListener("music:pause", handlePause);
            window.removeEventListener("music:resume", handleResume);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((e) => console.error("Audio play failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <motion.button
            className="relative w-12 h-12 flex items-center justify-center rounded-full border border-foreground/10 hover:border-foreground/30 transition-colors bg-background/50 backdrop-blur-sm"
            onClick={togglePlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Wave SVG */}
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-foreground"
            >
                <mask id="wave-mask">
                    <rect x="0" y="0" width="24" height="24" fill="white" />
                </mask>

                {/* 
                  Wave Path:
                  A sine wave that loops seamlessly.
                  We transform translate-x to animate it.
                 */}
                <g mask="url(#wave-mask)">
                    <motion.path
                        d="M0 12 Q 3 9, 6 12 T 12 12 T 18 12 T 24 12 T 30 12 T 36 12 T 42 12 T 48 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                        animate={{
                            x: isPlaying ? [0, -24] : 0,
                        }}
                        transition={{
                            duration: 2, // Speed of the wave
                            repeat: Infinity,
                            ease: "linear",
                            enabled: isPlaying ? true : false,
                        }}
                    />
                </g>
            </svg>

            {/* Ring Animation when playing */}
            {isPlaying && (
                <motion.div
                    className="absolute inset-0 rounded-full border border-foreground/20"
                    animate={{ scale: [1, 1.2], opacity: [1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}
        </motion.button>
    );
};
