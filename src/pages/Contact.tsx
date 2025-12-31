import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  animate,
  useInView,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Globe,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LineReveal, Magnetic } from "@/components/AnimationComponents";

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com" },
  { icon: Instagram, label: "Instagram", url: "https://instagram.com" },
  { icon: Globe, label: "Website", url: "https://forrof.io" },
];

// --- CLEAN, WORKING CONTACT PAGE COMPONENT ---
export default function ContactPage() {
  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@forrof.io" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: MapPin, label: "Location", value: "New York, NY" },
  ];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });
  const heroY = useTransform(smoothProgress, [0, 1], [0, 120]);
  const [stars, setStars] = useState<
    Array<{ id: number; x: number; y: number; delay: number; duration: number }>
  >([]);
  useEffect(() => {
    setStars(
      [...Array(40)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 4,
      }))
    );
  }, []);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

  return (
    <>
      {/* Hero Section (like Projects page) */}
      <motion.section
        ref={heroRef}
        className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-end section-padding pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Floating particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-foreground/20 pointer-events-none z-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 2 + Math.random() * 4,
              height: 2 + Math.random() * 4,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Hero Content */}
        <motion.div
          className="absolute inset-0 z-20 flex items-end section-padding pb-20"
          style={{ y: heroY }}
        >
          <div className="max-w-[1800px] mx-auto w-full pt-32 md:pt-40">
            <div className="overflow-hidden mb-6">
              <motion.h1
                className="text-[12vw] md:text-[10vw] font-bold leading-[0.9] tracking-tighter"
                initial={{ y: "120%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.4,
                }}
              >
                Let's Connect
              </motion.h1>
            </div>
            <motion.p
              className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              We’d love to hear about your ideas, projects, or just say hello.
              Start a conversation with our team today.
            </motion.p>
          </div>
        </motion.div>
      </motion.section>

      {/* Contact Info & Form Section */}
      <section className="section-padding md:py-40 py-20 relative overflow-hidden min-h-screen flex items-center">
        <div className="max-w-[1800px] mx-auto w-full">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.span className="number-label">/08</motion.span>
            <LineReveal className="h-px bg-border flex-1" delay={0.3} />
            <motion.span className="text-xs text-muted-foreground uppercase tracking-widest">
              Contact
            </motion.span>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Info & Socials */}
            <div className="flex-1 w-full">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2 text-foreground">
                  Contact Info
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-muted">
                        <info.icon size={18} className="text-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          {info.label}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {info.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-muted group-hover:bg-foreground group-hover:border-foreground transition-all duration-500">
                      <link.icon
                        size={18}
                        className="group-hover:text-background text-foreground transition-colors"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
            {/* Form */}
            <div className="flex-1 w-full">
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-8"
                // style={{ y: formY }}
                // initial={{ opacity: 0, x: 80 }}
                // animate={{ opacity: 1, x: 0 }}
                // transition={{
                //   duration: 1.2,
                //   delay: 0.4,
                //   ease: [0.25, 0.1, 0.25, 1],
                // }}
              >
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
                    <motion.div key={field.name}>
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
                          setFormData({
                            ...formData,
                            [field.name]: e.target.value,
                          })
                        }
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-background border-b-2 border-border py-4 focus:outline-none transition-colors placeholder:text-muted-foreground/40 focus:bg-background"
                        placeholder={field.placeholder}
                        required={
                          field.name === "name" || field.name === "email"
                        }
                        autoComplete="off"
                        whileFocus={{ borderColor: "hsl(var(--foreground))" }}
                      />
                      <motion.div
                        className="h-0.5 bg-foreground origin-left mt-[-2px]"
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: focusedField === field.name ? 1 : 0,
                        }}
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
                    <motion.div key={field.name}>
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
                          setFormData({
                            ...formData,
                            [field.name]: e.target.value,
                          })
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
                        animate={{
                          scaleX: focusedField === field.name ? 1 : 0,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.div>
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
                  animate={{ opacity: 1, y: 0 }}
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
                      <span className="relative z-10 transition-colors">
                        Send Message
                      </span>
                      <motion.div
                        className="relative z-10"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <ArrowUpRight size={18} className="transition-colors" />
                      </motion.div>
                    </motion.button>
                  </Magnetic>
                </motion.div>
              </motion.form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
