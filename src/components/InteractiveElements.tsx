import { useRef, useCallback, useEffect } from "react";
import { useInView } from "framer-motion";

/** Mouse-tracking glow card - zero re-renders, direct DOM writes */
export const GlowCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(0,212,170,0.12), transparent 60%)`;
    glowRef.current.style.opacity = "1";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
      {children}
    </div>
  );
};

/** RAF-based counter - writes directly to the DOM, no re-renders */
export const CountUp = ({ value, suffix = "", delay = 0 }: { value: string; suffix?: string; delay?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);
  const inView = useInView(ref as any, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || hasRun.current || !ref.current) return;
    hasRun.current = true;

    // Animate the first number and keep everything around it, so "5/5",
    // "0.1s", "$2M+" and "98%" all render as written.
    const full = value + suffix;
    const match = full.match(/^(\D*)(\d+(?:\.\d+)?)([\s\S]*)$/);
    if (!match) {
      setTimeout(() => { if (ref.current) ref.current.textContent = full; }, delay);
      return;
    }
    const [, before, num, after] = match;
    const numeric = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;

    const duration = 1200;
    let start: number;
    const el = ref.current;

    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = before + (eased * numeric).toFixed(decimals) + after;
      if (p < 1) requestAnimationFrame(step);
    };

    setTimeout(() => requestAnimationFrame(step), delay);
  }, [inView, value, suffix, delay]);

  return <span ref={ref} className="tabular-nums">0</span>;
};
