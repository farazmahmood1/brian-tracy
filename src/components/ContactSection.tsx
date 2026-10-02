import {
  AnimatePresence,
  motion,
  useInView,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Send, ArrowUpRight, Mail, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LineReveal, Magnetic } from "./AnimationComponents";

type ServiceOption = { value: string; label: string };

const serviceOptions: ServiceOption[] = [
  { value: "ai-automation", label: "AI & Automation" },
  { value: "custom-software", label: "Custom Software Development" },
  { value: "systems-integration", label: "Systems Integration & Data" },
  { value: "seo", label: "SEO & AI Search Visibility" },
  { value: "performance-marketing", label: "Performance Marketing" },
  { value: "not-sure", label: "Not sure yet - let's talk" },
];

const ServiceSelect = ({
  value,
  onChange,
  onFocus,
  onBlur,
}: {
  value: string;
  onChange: (v: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("mousedown", onDocClick);
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selected = serviceOptions.find((o) => o.value === value);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Hidden input so the value is included in FormData on submit */}
      <input type="hidden" name="serviceInterest" value={value} />
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          onFocus();
        }}
        onBlur={(e) => {
          if (!wrapperRef.current?.contains(e.relatedTarget as Node)) onBlur();
        }}
        className="w-full bg-background border-b-2 border-border py-4 pr-10 text-left focus:outline-none transition-colors text-foreground cursor-pointer flex items-center justify-between"
      >
        <span className={selected ? "text-foreground" : "text-muted-foreground"}>
          {selected ? selected.label : "Select a service…"}
        </span>
        <ChevronDown
          size={16}
          className={`text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl border border-border bg-background shadow-2xl overflow-hidden max-h-72 overflow-y-auto"
          >
            <ul role="listbox" className="py-1">
              {serviceOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onChange(opt.value);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between gap-3 transition-colors ${
                        isSelected
                          ? "bg-[#00d4aa]/10 text-foreground"
                          : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check size={14} className="text-[#00d4aa] shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    serviceInterest: "",
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
          serviceInterest: "",
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
    { icon: Phone, label: "Phone", value: "+1 (914) 899-0442" },
    { icon: MapPin, label: "Office", value: "312 W 2nd St Unit #A8583, Casper, WY 82601, USA" },
    { icon: Clock, label: "NZ & AU Hours", value: "Live calls 12–5pm AEST · 2–5pm NZT" },
  ];

  return (
    <section
      id="contact"
      className="section-forced-light section-padding md:py-20 py-20 overflow-hidden"
      ref={containerRef}
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span className="number-label">/09</motion.span>
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
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] pb-4"
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
              transition={{ delay: 0.65 }}
            >
              <motion.label
                className="block text-sm font-medium mb-3 text-muted-foreground"
                animate={{
                  color:
                    focusedField === "serviceInterest"
                      ? "hsl(var(--foreground))"
                      : "hsl(var(--muted-foreground))",
                }}
              >
                What do you need?
              </motion.label>
              <ServiceSelect
                value={formData.serviceInterest}
                onChange={(v) => setFormData({ ...formData, serviceInterest: v })}
                onFocus={() => setFocusedField("serviceInterest")}
                onBlur={() => setFocusedField(null)}
              />
              <motion.div
                className="h-0.5 bg-foreground origin-left mt-[-2px]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: focusedField === "serviceInterest" ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

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
    </section>
  );
};
