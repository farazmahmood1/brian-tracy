import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";
import { Send, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LineReveal, Magnetic } from "./AnimationComponents";

export const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });
  const formY = useTransform(smoothProgress, [0, 1], [100, -50]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    data.append("access_key", "d1b142cc-769d-44c1-acd9-f483031796ea");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          budget: "",
          message: "",
        });
      } else {
        toast({
          title: "Error",
          description:
            result.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@forrof.io" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: MapPin, label: "Location", value: "New York, NY" },
  ];

  return (
    <section
      id="contact"
      className="section-padding md:py-40 py-20 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span className="number-label">/08</motion.span>
          <LineReveal className="h-px bg-border flex-1" delay={0.3} />
          <motion.span className="text-xs text-muted-foreground uppercase tracking-widest">
            Contact
          </motion.span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left Column - CTA */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="overflow-hidden mb-8">
              <motion.h2
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95]"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{
                  duration: 1.2,
                  delay: 0.3,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                Let's create something amazing
              </motion.h2>
            </div>
            <motion.p
              className="text-xl text-muted-foreground mb-16 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              Ready to start your project? Fill out the form and we'll get back
              to you within 24 hours.
            </motion.p>

            {/* Contact Info with Hover Effects */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Magnetic key={info.label} strength={0.1}>
                  <motion.div
                    className="flex items-center gap-6 group cursor-pointer py-4 border-b border-border"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-all duration-500"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <info.icon
                        size={18}
                        className="group-hover:text-background transition-colors"
                      />
                    </motion.div>
                    <div className="flex-1">
                      <span className="text-sm text-muted-foreground block">
                        {info.label}
                      </span>
                      <span className="font-medium text-lg">{info.value}</span>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.div>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Animated Form */}
          <motion.form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                {
                  name: "name",
                  label: "Name",
                  placeholder: "John Doe",
                  type: "text",
                },
                {
                  name: "email",
                  label: "Email",
                  placeholder: "john@example.com",
                  type: "email",
                },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <motion.label
                    className="block text-sm font-medium mb-3 text-muted-foreground"
                    animate={{
                      color:
                        focusedField === field.name
                          ? "hsl(var(--foreground))"
                          : "hsl(var(--muted-foreground))",
                    }}
                  >
                    {field.label}
                  </motion.label>
                  <motion.input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-background border-b-2 border-border py-4 focus:outline-none transition-colors placeholder:text-muted-foreground/40 focus:bg-background"
                    placeholder={field.placeholder}
                    required={field.name === "name" || field.name === "email"}
                    autoComplete="off"
                    whileFocus={{ borderColor: "hsl(var(--foreground))" }}
                  />
                  <motion.div
                    className="h-0.5 bg-foreground origin-left mt-[-2px]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === field.name ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                {
                  name: "company",
                  label: "Company",
                  placeholder: "Your company",
                },
                {
                  name: "budget",
                  label: "Budget",
                  placeholder: "$5,000 - $10,000",
                },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <motion.label
                    className="block text-sm font-medium mb-3 text-muted-foreground"
                    animate={{
                      color:
                        focusedField === field.name
                          ? "hsl(var(--foreground))"
                          : "hsl(var(--muted-foreground))",
                    }}
                  >
                    {field.label}
                  </motion.label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-background border-b-2 border-border py-4 focus:outline-none transition-colors placeholder:text-muted-foreground/40 focus:bg-background"
                    placeholder={field.placeholder}
                    autoComplete="off"
                  />
                  <motion.div
                    className="h-0.5 bg-foreground origin-left mt-[-2px]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === field.name ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              <motion.label
                className="block text-sm font-medium mb-3 text-muted-foreground"
                animate={{
                  color:
                    focusedField === "message"
                      ? "hsl(var(--foreground))"
                      : "hsl(var(--muted-foreground))",
                }}
              >
                Message
              </motion.label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                rows={4}
                className="w-full bg-background border-b-2 border-border py-4 focus:outline-none transition-colors resize-none placeholder:text-muted-foreground/40 focus:bg-background"
                placeholder="Tell us about your project..."
                required
                autoComplete="off"
              />
              <motion.div
                className="h-0.5 bg-foreground origin-left mt-[-2px]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: focusedField === "message" ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <Magnetic strength={0.1}>
                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 py-6 bg-foreground text-background rounded-full font-medium overflow-hidden relative group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-muted"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="relative z-10">Send Message</span>
                  <motion.div
                    className="relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowUpRight size={18} />
                  </motion.div>
                </motion.button>
              </Magnetic>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
