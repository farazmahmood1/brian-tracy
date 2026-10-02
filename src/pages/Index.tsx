import { HeroSection } from "@/components/HeroSection";
import { MarqueeSection } from "@/components/MarqueeSection";
import { ServicesSection } from "@/components/ServicesSection";
import { OurClientsSection } from "@/components/OurClientsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AboutSection } from "@/components/AboutSection";
// import { BusinessScaleSection } from "@/components/BusinessScaleSection";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { InsightsSection } from "@/components/InsightsSection";
import { ContactSection } from "@/components/ContactSection";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useLenis } from "@/hooks/useLenis";
import { useEffect, useState } from "react";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { seo } from "@/constants/seo";

let homeShown = false;

const Index = () => {
  useLenis();

  usePageMetadata(seo("/"));

  const [isLoading, setIsLoading] = useState(!homeShown);
  const [globeReady, setGlobeReady] = useState(homeShown);
  const [minTimeElapsed, setMinTimeElapsed] = useState(homeShown);

  // Minimum loader display so it doesn't flash off too fast on cached loads
  useEffect(() => {
    if (homeShown) return;
    const t = setTimeout(() => setMinTimeElapsed(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Hard cap: dismiss after 8s even if the globe never reports ready
  // (slow connections, texture load errors, etc.)
  useEffect(() => {
    if (homeShown) return;
    const t = setTimeout(() => {
      setGlobeReady(true);
      setMinTimeElapsed(true);
    }, 8000);
    return () => clearTimeout(t);
  }, []);

  // Hide the loader once BOTH conditions met: min time elapsed AND globe loaded
  useEffect(() => {
    if (globeReady && minTimeElapsed && !homeShown) {
      homeShown = true;
      setIsLoading(false);
    }
  }, [globeReady, minTimeElapsed]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      <main className="overflow-x-clip">
        <HeroSection onGlobeReady={() => setGlobeReady(true)} />
        <OurClientsSection />
        <ServicesSection />
        <ProjectsSection />
        <AboutSection />
        {/* <BusinessScaleSection /> */}
        <PricingSection />
        <MarqueeSection />
        <TestimonialsSection />
        <FAQSection />
        <InsightsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Index;
