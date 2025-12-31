import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Ellipsis, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Magnetic } from "./AnimationComponents";
import { useNavigate } from "react-router-dom";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Articles", href: "/articles" },
  { name: "Contact", href: "/contact" },
];

const menuVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const linkVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.4,
    },
  },
};

const parallaxContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

const parallaxItemVariants = {
  hidden: {
    opacity: 0,
    y: 200,
    rotate: -10,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1] as const,
      type: "spring" as const,
      stiffness: 50,
      damping: 15,
    },
  },
};

export const NavbarMenuIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const smoothOpacity = useSpring(headerOpacity, {
    stiffness: 100,
    damping: 20,
  });

  const logoTextOpacity = useTransform(scrollY, [100, 250], [0, 1]);
  const logoTextY = useTransform(scrollY, [100, 250], [20, 0]);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (href.startsWith("/")) {
      navigate(href);
    }
  };

  return (
    <>
      {/* Background blur on scroll */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-24 z-40 pointer-events-none"
        style={{
          opacity: smoothOpacity,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
          backdropFilter: "blur(10px)",
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="section-padding py-6 flex items-center justify-between max-w-[1800px] mx-auto w-full">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-1 z-[100] relative cursor-pointer select-none "
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={() => {
              navigate("/");
            }}
          >
            <img src="/logo.svg" alt="Logo" className="w-14 h-14" />
            <motion.span
              className="text-3xl font-bold tracking-tight inline-block"
              style={{ opacity: logoTextOpacity, y: logoTextY }}
            >
              Forrof<sup className="text-xs">®</sup>
            </motion.span>
          </motion.div>

          {/* Menu Icon Button */}
          <Magnetic strength={0.2}>
            <motion.button
              className="relative w-12 h-12 flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-foreground/5 rounded-full"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <AnimatePresence mode="wait">
                {!isOpen ? (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Ellipsis
                      size={50}
                      strokeWidth={3}
                      className="relative z-10 font-extrabold"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{ duration: 0.4 }}
                  >
                    <X size={30} strokeWidth={2.5} className="relative z-10" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </Magnetic>
        </nav>
      </header>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            className="fixed inset-0 z-40 bg-background"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Background animated gradient with parallax */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-3xl"
                animate={{
                  x: [0, 100, 0],
                  y: [200, 50, 200],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-foreground/5 rounded-full blur-3xl"
                animate={{
                  x: [0, -50, 0],
                  y: [0, 100, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Extra parallax layers */}
              <motion.div
                className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-foreground/3 rounded-full blur-3xl"
                animate={{
                  x: [50, -50, 50],
                  y: [-100, 100, -100],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -top-32 right-1/3 w-[350px] h-[350px] bg-foreground/4 rounded-full blur-3xl"
                animate={{
                  x: [-100, 50, -100],
                  y: [100, -100, 100],
                  scale: [1, 0.7, 1],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Menu Content with enhanced parallax */}
            <motion.div
              className="relative z-10 h-full flex flex-col items-center justify-center section-padding"
              variants={parallaxContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Navigation Links with individual parallax */}
              <div className="space-y-8 md:space-y-12 text-center z-50">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    variants={parallaxItemVariants}
                    whileHover={{
                      scale: 1.08,
                      rotate: 3,
                      x: 20,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 15,
                    }}
                    className="relative"
                  >
                    <motion.div
                      className="absolute -inset-8 bg-foreground/5 rounded-lg blur-2xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="text-6xl md:text-8xl font-bold text-foreground hover:text-foreground/70 transition-colors duration-300 cursor-pointer block relative group"
                    >
                      <motion.span
                        className="absolute -left-12 md:-left-16 text-foreground/20 opacity-0 group-hover:opacity-100"
                        initial={{ x: 0, opacity: 0 }}
                        whileHover={{ x: -30, opacity: 1 }}
                        transition={{
                          duration: 0.4,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        ↗
                      </motion.span>
                      <motion.span
                        className="inline-block"
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      >
                        {link.name}
                      </motion.span>
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-foreground to-foreground/50 origin-left rounded-full"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{
                          duration: 0.5,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                      />
                    </motion.a>
                  </motion.div>
                ))}
              </div>

              {/* Footer Info with parallax */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 section-padding py-12"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <motion.a
                    href="mailto:hello@forrof.io"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    whileHover={{ x: 10 }}
                  >
                    hello@forrof.io
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
