import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "./AnimationComponents";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        if (theme === "system") {
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setResolvedTheme(isDark ? "dark" : "light");
        } else {
            setResolvedTheme(theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        if (theme === "system") {
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setTheme(isDark ? "light" : "dark");
        } else {
            setTheme(theme === "dark" ? "light" : "dark");
        }
    };

    return (
        <Magnetic strength={0.2}>
            <motion.button
                className="relative w-12 h-12 flex items-center justify-center rounded-full border border-foreground/10 hover:border-foreground/30 transition-colors bg-background/50 backdrop-blur-sm"
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {resolvedTheme === "dark" ? (
                        <motion.div
                            key="sun"
                            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Sun size={20} className="text-foreground" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="moon"
                            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Moon size={20} className="text-foreground" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <span className="sr-only">Toggle theme</span>
            </motion.button>
        </Magnetic>
    );
};
