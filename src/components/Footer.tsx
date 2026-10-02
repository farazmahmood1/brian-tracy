import { motion } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Facebook,
  ArrowUpRight,
} from "lucide-react";
import { Magnetic, LineReveal } from "./AnimationComponents";
import { useNavigate } from "react-router-dom";
import { useRef, useCallback } from "react";
import { SOCIAL_LINKS } from "@/constants/links";

const serviceLinks = [
  { name: "AI & Automation", href: "/services/ai-automation" },
  { name: "Custom Software Development", href: "/services/custom-software" },
  { name: "Systems Integration & Data", href: "/services/systems-integration" },
  { name: "SEO & AI Search Visibility", href: "/services/seo" },
  { name: "Performance Marketing", href: "/services/performance-marketing" },
];

// Core niches - shown as the highlighted band above the link columns
const focusIndustries = [
  {
    label: "LegalTech & Law Firms",
    desc: "Software, AI, and automation for New Zealand and Australian law firms - e-signing, client portals, legal AI assistants, and practice integrations.",
    href: "/industries/legaltech",
    cta: "Explore LegalTech",
    proof: { name: "FynoSign case study", href: "/project/fyno" },
  },
  {
    label: "Agriculture & AgriTech",
    desc: "Farm software, automation, and ongoing support for agribusinesses - farm management platforms, equipment and data integrations, and compliance reporting.",
    href: "/industries/agriculture",
    cta: "Explore Agriculture",
    proof: { name: "Bushel case study", href: "/project/bushel" },
  },
];

const industryLinks = [
  { name: "LegalTech & Law", href: "/industries/legaltech" },
  { name: "Agriculture & AgriTech", href: "/industries/agriculture" },
  { name: "FinTech & Finance", href: "/industries/fintech-finance" },
  { name: "Health & Wellness", href: "/industries/health-wellness" },
  { name: "Logistics & Transportation", href: "/industries/transportation" },
];

const businessSizeLinks = [
  { name: "Startups, MVPs & POCs", href: "/services/mvp" },
  { name: "Small Businesses", href: "/industries/small-business" },
  { name: "Mid-Sized Businesses", href: "/industries/mid-sized-business" },
  { name: "Enterprises", href: "/services/enterprise" },
  { name: "Government & Public Sector", href: "/industries/government" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Articles", href: "/articles" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
  { icon: Facebook, href: SOCIAL_LINKS.facebook, label: "Facebook" },
];

export const Footer = () => {
  const navigate = useNavigate();
  const glowRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);

  const handleGlowMove = useCallback((e: React.MouseEvent) => {
    if (!glowRef.current || !h2Ref.current) return;
    const rect = glowRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    h2Ref.current.style.backgroundImage = `radial-gradient(circle 300px at ${x}px ${y}px, #00d4aa 0%, rgba(18,107,102,0.4) 45%, rgba(255,255,255,0.05) 70%)`;
  }, []);

  const handleGlowLeave = useCallback(() => {
    if (h2Ref.current) {
      h2Ref.current.style.backgroundImage = 'linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05))';
    }
  }, []);

  const handleNav = useCallback((href: string) => {
    navigate(href);
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <footer className="section-forced-dark section-padding md:py-20 max-md:pb-10 border-t border-border overflow-hidden">

      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Big Logo with cursor glow */}
        <motion.div
          ref={glowRef}
          className="mb-16 md:mb-20 relative cursor-default"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onMouseMove={handleGlowMove}
          onMouseLeave={handleGlowLeave}
        >
          <h2
            ref={h2Ref}
            className="text-[20vw] md:text-[15vw] font-bold leading-none tracking-tighter select-none overflow-hidden"
            style={{
              color: 'transparent',
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              transition: 'none',
            }}
          >
            Forrof
          </h2>
        </motion.div>

        {/* Focus industries */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest mb-6">
            Specialists for New Zealand &amp; Australia
          </p>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {focusIndustries.map((item) => (
              <div
                key={item.label}
                className="group relative rounded-2xl border border-[#00d4aa]/20 hover:border-[#00d4aa]/40 p-6 md:p-8 transition-colors duration-300"
                style={{ background: "linear-gradient(160deg, #0a1317 0%, #0d1f1f 100%)" }}
              >
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#00d4aa]/80 font-semibold block mb-3">
                  Core Focus
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold mb-3">{item.label}</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xl">{item.desc}</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8fd6cb] hover:text-white transition-colors"
                  >
                    {item.cta}
                    <ArrowUpRight size={14} />
                  </a>
                  {item.proof && (
                    <a
                      href={item.proof.href}
                      onClick={(e) => { e.preventDefault(); handleNav(item.proof!.href); }}
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.proof.name}
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Footer Content - 5 columns matching navbar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-6">Services</p>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-1.5 group"
                  >
                    {link.name}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Industries */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-6">Industries</p>
            <ul className="space-y-3">
              {industryLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-1.5 group"
                  >
                    {link.name}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* By Business Size */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-6">Business Size</p>
            <ul className="space-y-3">
              {businessSizeLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-1.5 group"
                  >
                    {link.name}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-6">Company</p>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-1.5 group"
                  >
                    {link.name}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-2 md:col-span-1"
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-6">Connect</p>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Software, AI, and growth for New Zealand and Australian businesses - with a focus on legal and agriculture.
            </p>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <Magnetic key={social.label} strength={0.3}>
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={16} />
                  </motion.a>
                </Magnetic>
              ))}
            </div>
            <Magnetic strength={0.15}>
              <motion.a
                href="/contact"
                onClick={(e) => { e.preventDefault(); handleNav("/contact"); }}
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Talk
                <ArrowUpRight size={14} />
              </motion.a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <LineReveal className="h-px bg-border w-full mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Forrof. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a
                href="/privacy-policy"
                onClick={(e) => { e.preventDefault(); handleNav("/privacy-policy"); }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-and-policy"
                onClick={(e) => { e.preventDefault(); handleNav("/terms-and-policy"); }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
