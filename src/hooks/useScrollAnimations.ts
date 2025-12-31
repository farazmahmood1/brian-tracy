import { useScroll, useTransform, useSpring, MotionValue, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
import { useRef, useEffect, useState, RefObject } from "react";

// Hook for scroll-based parallax with velocity
export const useParallaxVelocity = (baseVelocity = 100) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useMotionValue(0);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return baseX;
};

// Hook for element reveal on scroll
export const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isRevealed };
};

// Hook for smooth scroll progress
export const useSmoothScrollProgress = (targetRef: RefObject<HTMLElement>) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return smoothProgress;
};

// Hook for text split animation
export const useSplitText = (text: string) => {
  const words = text.split(" ");
  const characters = text.split("");
  
  return {
    words,
    characters,
    wordCount: words.length,
    charCount: characters.length,
  };
};

// Hook for scroll-linked rotation
export const useScrollRotation = (targetRef: RefObject<HTMLElement>, rotationAmount = 360) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, rotationAmount]);
  const smoothRotate = useSpring(rotate, { stiffness: 50, damping: 20 });

  return smoothRotate;
};

// Hook for mouse parallax effect
export const useMouseParallax = (strength = 0.05) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set((e.clientX - centerX) * strength);
      mouseY.set((e.clientY - centerY) * strength);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, strength]);

  return { x, y };
};

// Hook for scroll-based scaling
export const useScrollScale = (targetRef: RefObject<HTMLElement>, scaleRange: [number, number] = [0.8, 1]) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return smoothScale;
};

// Hook for horizontal scroll
export const useHorizontalScroll = (targetRef: RefObject<HTMLElement>) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const smoothX = useSpring(x, { stiffness: 50, damping: 30 });

  return smoothX;
};

// Hook for scroll-based opacity
export const useScrollOpacity = (targetRef: RefObject<HTMLElement>) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center center", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return smoothOpacity;
};

// Hook for stagger animation delays
export const useStaggerDelay = (index: number, baseDelay = 0.1) => {
  return index * baseDelay;
};

// Hook for scroll velocity
export const useScrollVelocity = () => {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  
  return smoothVelocity;
};

// Hook for element distance from center
export const useCenterDistance = (ref: RefObject<HTMLElement>) => {
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const updateDistance = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const screenCenter = window.innerHeight / 2;
      setDistance(Math.abs(elementCenter - screenCenter) / screenCenter);
    };

    window.addEventListener("scroll", updateDistance, { passive: true });
    window.addEventListener("resize", updateDistance, { passive: true });
    updateDistance();

    return () => {
      window.removeEventListener("scroll", updateDistance);
      window.removeEventListener("resize", updateDistance);
    };
  }, [ref]);

  return distance;
};
