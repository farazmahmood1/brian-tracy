import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { X, Mail, ChevronRight, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Magnetic } from "./AnimationComponents";
import { MusicPlayer } from "./MusicPlayer";
import { useNavigate, useLocation } from "react-router-dom";
import { SOCIAL_LINKS } from "@/constants/links";
import { useToast } from "@/hooks/use-toast";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Articles", href: "/articles" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

interface IndustryLink {
  name: string;
  slug: string;
}

const industryLinks: IndustryLink[] = [
  { name: "Industrial Sector", slug: "industrial-sector" },
  { name: "Decision Intelligence", slug: "decision-intelligence" },
  { name: "FinTech & Finance", slug: "fintech-finance" },
  { name: "Health & Wellness", slug: "health-wellness" },
  { name: "LegalTech & Law", slug: "legaltech" },
  { name: "Logistics & Transportation", slug: "transportation" },
  { name: "Painting", slug: "painting" },
];

interface BusinessSizeLink {
  name: string;
  href: string;
  popular?: boolean;
}

const businessSizeLinks: BusinessSizeLink[] = [
  { name: "Startups, MVPs & POCs", href: "/services/mvp", popular: true },
  { name: "Small Businesses", href: "/industries/small-business" },
  { name: "Mid-Sized Businesses", href: "/industries/mid-sized-business", popular: true },
  { name: "Enterprises", href: "/services/enterprise" },
  { name: "Government & Public Sector", href: "/industries/government" },
];

interface ServiceLink {
  name: string;
  slug: string;
  subs: string[];
}

const serviceLinks: ServiceLink[] = [
  {
    name: "AI/ML Development",
    slug: "ai-ml",
    subs: ["AI Consulting", "Custom AI and ML Solutions", "Proof of Value / AI Prototype", "Generative AI & LLM-based Solutions", "Predictive Analytics & Forecasting", "AI-Powered Product Integrations"],
  },
  {
    name: "Enterprise Software",
    slug: "enterprise",
    subs: ["Enterprise Innovation Labs", "CIO / CTO Offices", "Corporate Digital Ventures", "Regional Divisions and R&D", "Enterprise AI / Automation"],
  },
  {
    name: "SaaS Development",
    slug: "saas",
    subs: ["Enterprise Application Development", "Custom AI/ML Solutions", "Digital Transformation", "Cross-platform SaaS Solutions", "End-to-end SaaS Product Development"],
  },
  {
    name: "MVP & POC",
    slug: "mvp",
    subs: ["Product Discovery & Analysis", "Rapid Prototyping & UX/UI", "Technical Feasibility Planning", "Lean Product Roadmap", "No-Code/Low-Code MVPs", "Pitch Deck & Investor Materials"],
  },
  {
    name: "Product Strategy",
    slug: "strategy",
    subs: ["Technical Due Diligence", "System Design & Architecture", "AI Strategy & Roadmapping", "CTO-as-a-Service", "Technology Stack Selection", "DevOps Consulting"],
  },
  {
    name: "Mobile App Development",
    slug: "mobile",
    subs: ["iOS & Android Apps", "Cross-platform Development", "App UI/UX Design", "App Maintenance & Support"],
  },
  {
    name: "Branding & UI/UX",
    slug: "ux-design",
    subs: ["Web-app Design", "Mobile Design", "Wireframing & Prototyping", "User Research", "UX Audit", "Ongoing Design Support"],
  },
  {
    name: "Social Media Marketing",
    slug: "social-media",
    subs: ["Social Media Strategy", "Content Creation & Copywriting", "Community Management", "Paid Social Advertising", "Analytics & Reporting", "Influencer Marketing"],
  },
];

const menuVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const ServiceItem = ({ service, onNavigate }: { service: ServiceLink; onNavigate: (href: string) => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-2 py-1.5">
        <a
          href={`/services/${service.slug}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(`/services/${service.slug}`);
          }}
          className="text-[15px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer py-0.5"
        >
          {service.name}
        </a>
        <button
          onMouseEnter={() => setOpen(true)}
          onClick={() => setOpen(!open)}
          className="text-muted-foreground/40 hover:text-foreground transition-colors"
        >
          <ChevronRight
            size={13}
            className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
            onMouseLeave={() => setOpen(false)}
          >
            <div className="pl-4 pb-2 space-y-1">
              {service.subs.map((sub, i) => (
                <a
                  key={sub}
                  href={`/services/${service.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/services/${service.slug}`);
                  }}
                  className="flex items-baseline gap-2 text-xs text-muted-foreground/50 hover:text-foreground/80 transition-colors cursor-pointer"
                >
                  <span className="text-[10px] text-accent/40 font-mono">/{String(i + 1).padStart(2, "0")}</span>
                  <span>{sub}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const NavbarMenuIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const logoTextOpacity = useTransform(scrollY, [100, 250], [0, 1]);
  const logoTextY = useTransform(scrollY, [100, 250], [20, 0]);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    interest: [] as string[],
    message: "",
  });

  const toggleInterest = (tag: string) => {
    setContactForm((prev) => ({
      ...prev,
      interest: prev.interest.includes(tag)
        ? prev.interest.filter((t) => t !== tag)
        : [...prev.interest, tag],
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);
    data.append("name", contactForm.name);
    data.append("email", contactForm.email);
    data.append("company", contactForm.company);
    data.append("phone", contactForm.phone);
    data.append("interest", contactForm.interest.join(", "));
    data.append("message", contactForm.message);
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
        setContactForm({ name: "", email: "", company: "", phone: "", interest: [], message: "" });
        setIsContactOpen(false);
      } else {
        toast({ title: "Error", description: result.message || "Something went wrong.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    }
  };

  // Logo hover-reveal effect (only active in hero zone)
  const logoRef = useRef<HTMLDivElement>(null);
  const [logoHovered, setLogoHovered] = useState(false);
  const [inHeroZone, setInHeroZone] = useState(true);

  // Track whether we're in the hero section — only setState when value actually changes
  useEffect(() => {
    let prev = true;
    return scrollY.on("change", (v) => {
      const next = v < 100;
      if (next !== prev) {
        prev = next;
        setInHeroZone(next);
      }
    });
  }, [scrollY]);

  const logoRevealActive = inHeroZone && logoHovered;

  // Close menu and contact form on route change
  useEffect(() => {
    setIsOpen(false);
    setIsContactOpen(false);
  }, [location.pathname]);

  // Close menu/contact on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsContactOpen(false);
      }
    };
    if (isOpen || isContactOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, isContactOpen]);

  // Page stays scrollable when menu is open — no overflow lock

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (href.startsWith("/")) {
      // Delay navigation slightly to allow exit animation to start
      setTimeout(() => {
        navigate(href);
        window.scrollTo(0, 0);
      }, 300);
    }
  };

  return (
    <>
      {/* Background bar on scroll — seamless dark fade */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-24 z-40 pointer-events-none backdrop-blur-md"
        style={{
          opacity: headerOpacity,
          background:
            "linear-gradient(to bottom, rgba(5, 10, 18, 0.95) 0%, rgba(5, 10, 18, 0.8) 50%, rgba(5, 10, 18, 0) 100%)",
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="px-4 md:px-8 lg:px-16 xl:px-20 py-6 flex items-center justify-between max-w-[1800px] mx-auto w-full">
          {/* Logo with hover-reveal in hero zone */}
          <motion.div
            ref={logoRef}
            className="flex items-center gap-1 z-[100] relative select-none"
            style={{ cursor: logoRevealActive ? "none" : "pointer" }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={() => navigate("/")}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            data-cursor-hide={inHeroZone || undefined}
          >
            {/* Invisible expanded hitbox so hovering the text area also triggers reveal */}
            {inHeroZone && (
              <div
                className="absolute inset-0 pointer-events-auto"
                style={{ right: "-180px" }}
              />
            )}
            <img src="/logo-white.png" alt="Forrof Logo" title="Forrof" className="w-9 h-9 relative z-10" />

            {/* Hero zone: hover-reveal text */}
            {inHeroZone ? (
              <AnimatePresence>
                {logoHovered && (
                  <motion.span
                    className="text-3xl font-bold tracking-tight inline-block relative z-10 whitespace-nowrap"
                    initial={{ opacity: 0, x: -10, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -10, filter: "blur(8px)" }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    &nbsp;forrof.io
                  </motion.span>
                )}
              </AnimatePresence>
            ) : (
              /* Scrolled past hero: normal scroll-based reveal */
              <motion.span
                className="text-3xl font-bold tracking-tight inline-block relative z-10"
                style={{ opacity: logoTextOpacity, y: logoTextY }}
              >
                &nbsp;forrof.io
              </motion.span>
            )}
          </motion.div>



          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4 z-[100]">
            {/* Let's Talk */}
            <motion.button
              onClick={() => {
                setIsContactOpen(!isContactOpen);
                setIsOpen(false);
              }}
              className={`hidden md:inline-flex items-center justify-center cursor-pointer ${
                isContactOpen ? "w-12 h-12" : "gap-1.5 text-sm font-medium text-foreground hover:text-foreground/70 transition-colors border-b border-foreground/30 pb-0.5"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={isContactOpen ? { scale: 1.05 } : { y: -1 }}
              whileTap={isContactOpen ? { scale: 0.95 } : undefined}
            >
              <AnimatePresence mode="wait">
                {isContactOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{ duration: 0.4 }}
                  >
                    <X size={30} strokeWidth={2.5} className="relative z-10" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="talk"
                    className="flex items-center gap-1.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Let's talk
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M1 13L13 1M13 1H3M13 1V11" stroke="#48f0e7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <span className="hidden md:block w-px h-5 bg-foreground/20 mx-1" />

            {/* Music Player */}
            <Magnetic strength={0.2}>
              <MusicPlayer />
            </Magnetic>

            {/* Menu Button */}
            <Magnetic strength={0.2}>
              <motion.button
                className="relative w-12 h-12 flex items-center justify-center cursor-pointer"
                onClick={() => { setIsOpen(!isOpen); setIsContactOpen(false); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
              >
                <AnimatePresence mode="wait">
                  {!isOpen ? (
                    <motion.div
                      key="menu"
                      className="flex flex-col items-end gap-[7px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span className="block w-8 h-[2.5px] bg-foreground rounded-full" />
                      <motion.span className="block w-6 h-[2.5px] bg-foreground rounded-full" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      transition={{ duration: 0.4 }}
                    >
                      <X size={30} strokeWidth={2.5} className="relative z-10" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </Magnetic>
          </div>
        </nav>
      </header>

      {/* Menu Overlay — floating card over blurred backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Layer 1: Transparent backdrop — pointer-events-none so page scrolls behind */}
            <motion.div
              className="fixed inset-0 z-40 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ background: "rgba(0, 0, 0, 0.15)" }}
            />

            {/* Layer 2: Floating glass card */}
            <motion.div
              ref={menuRef}
              className="fixed z-40 left-4 right-4 bottom-4 md:left-6 md:right-6 md:bottom-6 lg:left-10 lg:right-10 lg:bottom-8 top-[5.5rem] md:top-[6rem] rounded-2xl md:rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Glass background */}
              <div className="absolute inset-0 backdrop-blur-2xl bg-background/60" />
              <div className="absolute inset-0 border border-foreground/[0.06] rounded-2xl md:rounded-3xl pointer-events-none" />
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/3 rounded-full blur-[80px]" />
              </div>

              {/* Card content */}
              <motion.div
                className="relative z-10 h-full flex flex-col px-6 md:px-12 lg:px-16 pt-10 md:pt-14 pb-6 overflow-y-auto"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {/* Multi-column content */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_0.7fr_0.6fr_0.6fr_1.2fr] gap-8 md:gap-6 lg:gap-6 items-start">

                  {/* Left — Connect info */}
                  <motion.div variants={slideUp} className="flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-sm text-accent font-medium">Connect with us!</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-[2.8rem] font-bold leading-[1.1] tracking-tight mb-8">
                        Turn Your Vision Into an Experience That Lasts
                      </h2>
                      <div className="w-10 h-px bg-foreground/20 mb-6" />
                      <a
                        href="mailto:hello@forrof.io"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8"
                      >
                        <Mail size={15} />
                        hello@forrof.io
                      </a>
                    </div>
                    <motion.a
                      href="/contact"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick("/contact");
                      }}
                      className="inline-flex items-center gap-2 bg-foreground text-background px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity w-fit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Let's Talk
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="ml-1">
                        <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.a>
                  </motion.div>

                  {/* Middle — Navigation */}
                  <motion.div variants={slideUp}>
                    <div className="mb-5 pb-3 border-b border-foreground/10">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Navigation</span>
                    </div>
                    <nav className="space-y-0.5">
                      {navLinks.map((link, index) => (
                        <motion.a
                          key={link.name}
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(link.href);
                          }}
                          className={`block py-3 text-base md:text-lg font-medium transition-colors duration-300 cursor-pointer ${
                            location.pathname === link.href
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                        >
                          <span className="flex items-center gap-3">
                            {location.pathname === link.href && (
                              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            )}
                            {link.name}
                          </span>
                        </motion.a>
                      ))}
                    </nav>
                  </motion.div>

                  {/* Industries */}
                  <motion.div variants={slideUp}>
                    <div className="mb-5 pb-3 border-b border-foreground/10">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Industries</span>
                    </div>
                    <nav className="space-y-0.5">
                      {industryLinks.map((link, index) => (
                        <motion.a
                          key={link.slug}
                          href={`/industries/${link.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(`/industries/${link.slug}`);
                          }}
                          className={`block py-2.5 text-[15px] font-medium transition-colors duration-300 cursor-pointer ${
                            location.pathname === `/industries/${link.slug}`
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                        >
                          <span className="flex items-center gap-3">
                            {location.pathname === `/industries/${link.slug}` && (
                              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            )}
                            {link.name}
                          </span>
                        </motion.a>
                      ))}
                    </nav>
                  </motion.div>

                  {/* Business Size */}
                  <motion.div variants={slideUp}>
                    <div className="mb-5 pb-3 border-b border-foreground/10">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">By Business Size</span>
                    </div>
                    <nav className="space-y-0.5">
                      {businessSizeLinks.map((link, index) => {
                        const hasPage = link.href !== "";
                        return (
                          <motion.a
                            key={link.name}
                            href={hasPage ? link.href : undefined}
                            onClick={(e) => {
                              e.preventDefault();
                              if (hasPage) handleNavClick(link.href);
                            }}
                            className={`block py-2.5 text-[15px] font-medium transition-colors duration-300 ${
                              hasPage
                                ? location.pathname === link.href
                                  ? "text-foreground cursor-pointer"
                                  : "text-muted-foreground hover:text-foreground cursor-pointer"
                                : "text-muted-foreground/30 cursor-default"
                            }`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                          >
                            <span className="flex items-center gap-2">
                              {location.pathname === link.href && hasPage && (
                                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                              )}
                              {link.name}
                              {link.popular && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent/15 text-accent font-semibold uppercase tracking-wider">Popular</span>
                              )}
                            </span>
                          </motion.a>
                        );
                      })}
                    </nav>
                  </motion.div>

                  {/* Right — Services with expandable sub-items */}
                  <motion.div variants={slideUp} className="overflow-y-auto max-h-full pr-2">
                    <div className="mb-5 pb-3 border-b border-foreground/10">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Services</span>
                    </div>
                    <div className="space-y-0.5">
                      {serviceLinks.map((service) => (
                        <ServiceItem key={service.slug} service={service} onNavigate={handleNavClick} />
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Bottom bar */}
                <motion.div
                  className="pt-5 border-t border-foreground/10 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-muted-foreground">
                      © {new Date().getFullYear()} Forrof. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                      {[
                        { name: "LinkedIn", url: SOCIAL_LINKS.linkedin },
                        { name: "Instagram", url: SOCIAL_LINKS.instagram },
                        { name: "Facebook", url: SOCIAL_LINKS.facebook },
                      ].map((social) => (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Follow Forrof on ${social.name}`}
                          className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors text-[10px]"
                        >
                          {social.name[0]}
                        </a>
                      ))}
                    </div>
                    <div className="flex gap-5">
                      <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); handleNavClick("/privacy-policy"); }} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        Privacy Policy
                      </a>
                      <a href="/terms-and-policy" onClick={(e) => { e.preventDefault(); handleNavClick("/terms-and-policy"); }} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        Terms Of Use
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contact Form Overlay */}
      <AnimatePresence>
        {isContactOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ background: "rgba(0, 0, 0, 0.15)" }}
              onClick={() => setIsContactOpen(false)}
            />

            {/* Floating glass card */}
            <motion.div
              className="fixed z-40 left-4 right-4 bottom-4 md:left-6 md:right-6 md:bottom-6 lg:left-10 lg:right-10 lg:bottom-8 top-[5.5rem] md:top-[6rem] rounded-2xl md:rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Glass background */}
              <div className="absolute inset-0 backdrop-blur-2xl bg-background/60" />
              <div className="absolute inset-0 border border-foreground/[0.06] rounded-2xl md:rounded-3xl pointer-events-none" />
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/3 rounded-full blur-[80px]" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col px-6 md:px-12 lg:px-16 pt-10 md:pt-14 pb-6 overflow-y-auto">
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">

                  {/* Left — Connect info */}
                  <motion.div
                    className="flex flex-col justify-between h-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-6">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-sm text-accent font-medium">Connect with us!</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-[2.8rem] font-bold leading-[1.1] tracking-tight mb-8">
                        Turn Your Vision Into an Experience That Lasts
                      </h2>
                      <div className="w-10 h-px bg-foreground/20 mb-6" />
                      <a
                        href="mailto:hello@forrof.io"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8"
                      >
                        <Mail size={15} />
                        hello@forrof.io
                      </a>
                    </div>
                    <div className="flex items-center gap-3 mt-auto">
                      {[
                        { name: "LinkedIn", url: SOCIAL_LINKS.linkedin },
                        { name: "Instagram", url: SOCIAL_LINKS.instagram },
                        { name: "Facebook", url: SOCIAL_LINKS.facebook },
                      ].map((social) => (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          className="w-9 h-9 rounded-full border border-foreground/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors text-[11px]"
                        >
                          {social.name[0]}
                        </a>
                      ))}
                    </div>
                  </motion.div>

                  {/* Right — Contact form */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Let's talk</h3>
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <input
                            type="text"
                            name="name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            placeholder="Full name"
                            required
                            autoComplete="off"
                            className="w-full bg-transparent border-b border-foreground/20 py-3 text-sm focus:outline-none focus:border-foreground/60 transition-colors placeholder:text-muted-foreground/50"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="company"
                            value={contactForm.company}
                            onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                            placeholder="Company"
                            autoComplete="off"
                            className="w-full bg-transparent border-b border-foreground/20 py-3 text-sm focus:outline-none focus:border-foreground/60 transition-colors placeholder:text-muted-foreground/50"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <input
                            type="email"
                            name="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="Email"
                            required
                            autoComplete="off"
                            className="w-full bg-transparent border-b border-foreground/20 py-3 text-sm focus:outline-none focus:border-foreground/60 transition-colors placeholder:text-muted-foreground/50"
                          />
                        </div>
                        <div>
                          <input
                            type="tel"
                            name="phone"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                            placeholder="Phone"
                            autoComplete="off"
                            className="w-full bg-transparent border-b border-foreground/20 py-3 text-sm focus:outline-none focus:border-foreground/60 transition-colors placeholder:text-muted-foreground/50"
                          />
                        </div>
                      </div>

                      {/* Interest tags */}
                      <div>
                        <p className="text-sm text-muted-foreground mb-3">I'm interested in</p>
                        <div className="flex flex-wrap gap-2">
                          {["UI/UX", "Development", "Branding", "AI/ML", "Mobile App", "SaaS"].map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleInterest(tag)}
                              className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 ${
                                contactForm.interest.includes(tag)
                                  ? "bg-foreground text-background border-foreground"
                                  : "bg-transparent text-foreground/70 border-foreground/20 hover:border-foreground/40"
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <textarea
                          name="message"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="Tell us more about your project!"
                          rows={3}
                          className="w-full bg-transparent border-b border-foreground/20 py-3 text-sm focus:outline-none focus:border-foreground/60 transition-colors resize-none placeholder:text-muted-foreground/50"
                          autoComplete="off"
                        />
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        className="w-full flex items-center justify-center gap-3 py-4 rounded-full font-semibold text-sm uppercase tracking-wider bg-foreground text-background hover:opacity-90 transition-opacity"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Send
                        <ArrowRight size={16} />
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
