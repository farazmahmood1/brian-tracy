import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

export const LoadingScreen = ({
  isLoading,
  onLoadingComplete,
}: LoadingScreenProps) => {
  const [displayLoading, setDisplayLoading] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setDisplayLoading(true);
    } else if (!isLoading && displayLoading) {
      // Delay before removing to show exit animation
      const timer = setTimeout(() => {
        setDisplayLoading(false);
        onLoadingComplete?.();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading, displayLoading, onLoadingComplete]);

  return (
    <AnimatePresence>
      {displayLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Animated background gradient blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"
              animate={{
                x: [0, -50, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-80 h-80 bg-foreground/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Main loading content */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            {/* Animated logo/brand */}
            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="text-5xl md:text-6xl font-bold tracking-tight"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex  items-center">
                  <img src="/logo.svg" alt="" width={90} height={90} />
                  <span className="inline-block">
                    Forrof<sup className="text-2xl">®</sup>
                  </span>
                </div>
              </motion.div>

              {/* Animated dot pulse */}
              <div className="flex gap-2 h-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-foreground"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Loading text with reveal animation */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.p
                className="text-sm text-muted-foreground uppercase tracking-widest"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Develop to Scale, Designed to Lead
              </motion.p>
            </motion.div>

            {/* Animated progress bar */}
            <motion.div
              className="w-64 h-1 bg-foreground/10 rounded-full overflow-hidden"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 256 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-foreground/30 via-foreground to-foreground/30 rounded-full"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Floating particles background */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-foreground/20 rounded-full"
                initial={{
                  x: Math.random() * 400 - 200,
                  y: Math.random() * 400 - 200,
                  opacity: 0,
                }}
                animate={{
                  x: Math.random() * 800 - 400,
                  y: Math.random() * 800 - 400,
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Rotating orbit rings */}
            <motion.div
              className="absolute w-48 h-48 border border-foreground/10 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
            <motion.div
              className="absolute w-72 h-72 border border-foreground/5 rounded-full"
              animate={{ rotate: -360 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          </motion.div>

          {/* Optional loading percentage */}
          <motion.div
            className="absolute bottom-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.span
              className="text-xs text-muted-foreground"
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              Preparing Your Experience
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
