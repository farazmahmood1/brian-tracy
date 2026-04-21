import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { useRef, useState } from "react";
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
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { SOCIAL_LINKS } from "@/constants/links";

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", url: SOCIAL_LINKS.linkedin },
  { icon: Instagram, label: "Instagram", url: SOCIAL_LINKS.instagram },
  { icon: Globe, label: "Website", url: SOCIAL_LINKS.website },
];



// --- CLEAN, WORKING CONTACT PAGE COMPONENT ---
export default function ContactPage() {
  // SEO Meta Tags
  usePageMetadata({
    title: "Contact – Forrof",
    description: "Get in touch with the Forrof team. We’d love to hear about your ideas, projects, or just say hello. Start a conversation today.",
  });


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
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    data.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);
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
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-end section-padding pb-16 md:pb-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[calc(50%-350px)] right-0 w-[700px] h-[700px] rounded-full blur-[130px] opacity-70"
            style={{ background: "rgba(0, 212, 170, 0.08)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[50px] opacity-50"
            style={{ background: "rgba(18, 107, 102, 0.1)" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background z-10" />

        <motion.div className="relative z-20 max-w-[1800px] mx-auto w-full" style={{ y: heroY }}>
          <motion.span
            className="inline-block text-xs uppercase tracking-[0.3em] mb-8"
            style={{ color: "#00d4aa" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Get in touch
          </motion.span>
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="text-[13vw] md:text-[10vw] font-bold leading-[0.88] tracking-tighter"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #48f0e7 30%, #00d4aa 60%, #126b66 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                backgroundSize: "200% 200%",
              }}
              initial={{ y: "110%", backgroundPosition: "0% 50%" }}
              animate={{ y: 0, backgroundPosition: "100% 50%" }}
              transition={{
                y: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 },
                backgroundPosition: { duration: 3, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" },
              }}
            >
              Let’s Connect
            </motion.h1>
          </div>
          <motion.p
            className="text-lg md:text-2xl max-w-xl leading-relaxed mt-10"
            style={{ color: "#48f0e7" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            We’d love to hear about your ideas, projects, or just say hello. Start a conversation today.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Contact Info & Form Section */}
      <section className="section-forced-light section-padding md:py-40 py-20 overflow-hidden min-h-screen flex items-center">
        <div className="max-w-[1800px] mx-auto w-full">
          <motion.div
            className="flex items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.span className="number-label">/09</motion.span>
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
                        className="h-0.5 origin-left mt-[-2px]"
                        style={{ background: "linear-gradient(90deg, #126b66, #00d4aa)" }}
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
                        className="h-0.5 origin-left mt-[-2px]"
                        style={{ background: "linear-gradient(90deg, #126b66, #00d4aa)" }}
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
                    className="h-0.5 origin-left mt-[-2px]"
                        style={{ background: "linear-gradient(90deg, #126b66, #00d4aa)" }}
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
                      className="w-full flex items-center justify-center gap-3 py-6 rounded-full font-medium text-white overflow-hidden relative group"
                      style={{ background: "linear-gradient(135deg, #126b66, #00d4aa)" }}
                      whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(72, 240, 231, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 font-medium">Send Message</span>
                      <ArrowUpRight size={18} className="relative z-10" />
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
