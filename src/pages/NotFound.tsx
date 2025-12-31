import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { Magnetic } from "@/components/AnimationComponents";

const funnyLines = [
  "This page is lost in space...",
  "404: The page you seek is in another galaxy!",
  "Oops! Even our best astronauts can't find this page.",
  "Did you just black hole the internet?",
  "You found a wormhole to nowhere!",
];

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 route:", location.pathname);
  }, [location.pathname]);

  const stars = useMemo(
    () =>
      Array.from({ length: 60 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 3,
        opacity: 0.7 + Math.random() * 0.3,
      })),
    []
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a1a] to-[#112244] overflow-hidden">
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
            }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-xl">
        <motion.h1
          className="mb-6 text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-blue-400 via-white to-blue-600 bg-clip-text text-transparent"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          404
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.4, delayChildren: 0.4 },
            },
          }}
          className="mb-10"
        >
          {funnyLines.map((line, i) => (
            <motion.p
              key={i}
              className="text-xl md:text-2xl text-blue-100 mb-2"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                },
              }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        <Magnetic strength={0.15}>
          <motion.button
            onClick={() => navigate("/")}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
              },
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full border border-border bg-background/80 backdrop-blur-md"
          >
            <ArrowLeft size={18} />
            <span className="font-medium">Go Home</span>
          </motion.button>
        </Magnetic>
      </div>
    </div>
  );
};

export default NotFound;
