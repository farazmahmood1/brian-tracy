import { memo, useEffect, useRef, useState } from "react";

// Logo numbers to leave out of the carousel
const hiddenLogos = new Set([15]);
const logoNumbers = Array.from({ length: 23 }, (_, i) => i + 1).filter(
  (n) => !hiddenLogos.has(n)
);
const paths = logoNumbers.map((n) => `https://dev.gemseeroo.com/logo/${n}.png`);
const names = logoNumbers.map((n) => `Client ${n}`);
const mid = Math.ceil(paths.length / 2);
const row1 = paths.slice(0, mid);
const row2 = paths.slice(mid);
const names1 = names.slice(0, mid);
const names2 = names.slice(mid);

const logoAlt = (n: string) => n;

const onErr = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const t = e.target as HTMLImageElement;
  if (t && !t.dataset.fallback) {
    t.dataset.fallback = "1";
    t.src = "/placeholder.svg";
  }
};

const LogoTrack = memo(
  ({
    srcs,
    altNames,
    direction,
  }: {
    srcs: string[];
    altNames: string[];
    direction: "fwd" | "rev";
  }) => (
    <div style={{ overflow: "hidden" }}>
      <div className={direction === "fwd" ? "cs-track-fwd" : "cs-track-rev"}>
        {[...srcs, ...srcs].map((src, i) => (
          <div key={i} className="cs-logo-card">
            <img
              src={src}
              alt={logoAlt(altNames[i % altNames.length])}
              width={160}
              height={68}
              // First 6 are above-the-fold; rest can lazy-load
              loading={i < 6 ? "eager" : "lazy"}
              decoding="async"
              onError={onErr}
              className="cs-logo-img"
            />
          </div>
        ))}
      </div>
    </div>
  )
);
LogoTrack.displayName = "LogoTrack";

export const OurClientsSection = memo(() => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
  <section
    ref={ref}
    className={visible ? undefined : "marquee-paused"}
    style={{
      padding: "40px 0",
      overflow: "hidden",
      backgroundColor: "#ffffff",
    }}
  >
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 100,
          background: "linear-gradient(to right, #ffffff, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 100,
          background: "linear-gradient(to left, #ffffff, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <LogoTrack srcs={row1} altNames={names1} direction="fwd" />
      <LogoTrack srcs={row2} altNames={names2} direction="rev" />
    </div>
  </section>
  );
});
OurClientsSection.displayName = "OurClientsSection";

export default OurClientsSection;
