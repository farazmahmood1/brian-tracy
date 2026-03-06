import { motion } from "framer-motion";

export const OurClientsSection = () => {

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

  const paths = clientFiles.map((name) => `${import.meta.env.VITE_SERVER}/clients/${encodeURI(name)}`);

  return (
    <section className="relative overflow-hidden" >
      {/* Background gradient */}
      <div className="absolute inset-0 from-background via-muted/20 to-background" />

      <div className="relative z-10 px-4" >
        {/* Header */}

        {/* Clients Grid */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {paths.map((src, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-center w-[200px] h-[100px] backdrop-blur-sm rounded-2xl px-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <img
                src={src}
                alt={clientFiles[i].replace(/\.(png|jpg|jpeg|svg|jfif|webp)$/i, '').replace(/[-_]/g, ' ')}
                className="max-h-[60px] max-w-[160px] object-contain filter grayscale hover:grayscale-0 transition-all duration-150"
                loading="lazy"
                decoding="async"
                width="160"
                height="60"
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
        </div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10 pt-12 border-border/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {[
            { number: "50+", label: "Happy Clients" },
            { number: "150+", label: "Projects Completed" },
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
