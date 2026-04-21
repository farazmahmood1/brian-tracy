import { memo, useEffect, useRef, useState } from "react";

const clientFiles = [
  "Appen-Talent Store Logo.png",
  "Bushal Farm Logo.jpg",
  "a (7).jpeg",
  "carbonmade_logo.jfif",
  "curogram logo.jfif",
  "a (4).jpeg",
  "FitReps Logo.svg",
  "Fynosign Logo (2).png",
  "glampinghub logo.jpg",
  "Khrimsay Logo.png",
  "Kumon North America, Inc. logo.png",
  "logo_1714715740.jpg",
  "loopiq logo.jfif",
  "a (3).jpeg",
  "LoopIQ Logo.jpg",
  "mapmatix logo.jfif",
  "Olio_Logo.jpg",
  "a (1).jpeg",
  "Ruhr-Universität logo.jpg",
  "Screenshot 2025-12-28 163931.png",
  "a (2).jpeg",
  "a (5).jpeg",
];

const paths = clientFiles.map(
  (n) => `${import.meta.env.VITE_SERVER}/clients/${encodeURI(n)}`
);
const mid = Math.ceil(paths.length / 2);
const row1 = paths.slice(0, mid);
const row2 = paths.slice(mid);
const names1 = clientFiles.slice(0, mid);
const names2 = clientFiles.slice(mid);

const logoAlt = (n: string) =>
  n.replace(/\.(png|jpg|jpeg|svg|jfif|webp)$/i, "").replace(/[-_]/g, " ");

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
              loading="eager"
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
