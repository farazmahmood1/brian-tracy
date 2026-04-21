import { useRef, useEffect, useState, RefObject } from "react";

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

// Hook for stagger animation delays
export const useStaggerDelay = (index: number, baseDelay = 0.1) => {
  return index * baseDelay;
};
