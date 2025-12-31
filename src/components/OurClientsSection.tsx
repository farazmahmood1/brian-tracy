import { motion } from "framer-motion";

export const OurClientsSection = () => {
  const clientFiles = [
    "Appen-Talent Store Logo.png",
    "Bushal Farm Logo.jpg",
    "carbonmade_logo.jfif",
    "curogram logo.jfif",
    "FitReps Logo.svg",
    "Fynosign Logo (2).png",
    "glampinghub logo.jpg",
    "Khrimsay Logo.png",
    "Kumon North America, Inc. logo.png",
    "logo_1714715740.jpg",
    "loopiq logo.jfif",
    "LoopIQ Logo.jpg",
    "mapmatix logo.jfif",
    "Olio_Logo.jpg",
    "Ruhr-Universität logo.jpg",
    "Screenshot 2025-12-28 163931.png"
  ];

  const paths = clientFiles.map((name) => `https://dev.gemseeroo.com/clients/${encodeURI(name)}`);

  const firstRow = paths.slice(0, Math.ceil(paths.length / 2));
  const secondRow = paths.slice(Math.ceil(paths.length / 2));

  return (
    <section className="md:pt-10 pt-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="max-w-[1800px] mx-auto relative z-10 px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Trusted By
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Our Clients
          </motion.h2>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* First Row - Left to Right */}
          <div className="relative overflow-hidden mb-8">
            <motion.div
              className="flex gap-12"
              animate={{ x: [0, -1920] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[...firstRow, ...firstRow, ...firstRow].map((src, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-center shrink-0 w-[200px] h-[100px] bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 px-6 hover:border-border hover:bg-card transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <img
                    src={src}
                    alt={`Client ${i + 1}`}
                    className="max-h-[60px] max-w-[160px] object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      if (t && !t.dataset.fallback) {
                        t.dataset.fallback = "1";
                        t.src = "/placeholder.svg";
                      }
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Second Row - Right to Left */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-12"
              animate={{ x: [-1920, 0] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 35,
                  ease: "linear",
                },
              }}
            >
              {[...secondRow, ...secondRow, ...secondRow].map((src, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-center shrink-0 w-[200px] h-[100px] bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 px-6 hover:border-border hover:bg-card transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <img
                    src={src}
                    alt={`Client ${i + 1}`}
                    className="max-h-[60px] max-w-[160px] object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      if (t && !t.dataset.fallback) {
                        t.dataset.fallback = "1";
                        t.src = "/placeholder.svg";
                      }
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-border/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {[
            { number: "50+", label: "Happy Clients" },
            { number: "120+", label: "Projects Completed" },
            { number: "5+", label: "Years Experience" },
            { number: "98%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <motion.span
                className="text-4xl md:text-5xl font-bold block mb-2"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
              >
                {stat.number}
              </motion.span>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurClientsSection;
