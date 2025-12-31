import { HeroSection } from "@/components/HeroSection";
import { MarqueeSection } from "@/components/MarqueeSection";
import { ServicesSection } from "@/components/ServicesSection";
import { OurClientsSection } from "@/components/OurClientsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AboutSection } from "@/components/AboutSection";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TeamSection } from "@/components/TeamSection";
import { FAQSection } from "@/components/FAQSection";
import { InsightsSection } from "@/components/InsightsSection";
import { ContactSection } from "@/components/ContactSection";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useLenis } from "@/hooks/useLenis";
import { useEffect, useState } from "react";

const Index = () => {
  // Initialize Lenis smooth scrolling
  useLenis();

  const [isLoading, setIsLoading] = useState(true);

  // Show loader for at least 3 seconds, even on reload
  useEffect(() => {
    let minTimeout: NodeJS.Timeout;
    let loaded = false;

    const finishLoading = () => {
      if (loaded) return;
      loaded = true;
      setIsLoading(false);
    };

    // Wait for both: page load and minimum time
    const handleLoad = () => {
      clearTimeout(minTimeout);
      // Wait for minimum 3s if not already passed
      setTimeout(
        finishLoading,
        Math.max(0, 3000 - (performance.now() - startTime))
      );
    };

    const startTime = performance.now();
    minTimeout = setTimeout(() => {
      if (document.readyState === "complete") {
        finishLoading();
      }
    }, 3000);

    if (document.readyState === "complete") {
      setTimeout(finishLoading, 3000);
    } else {
      window.addEventListener("load", handleLoad);
    }
    return () => {
      clearTimeout(minTimeout);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />

      <main>
        <HeroSection />
        <MarqueeSection />
        <ServicesSection />
        <OurClientsSection />
        <ProjectsSection />
        <AboutSection />
        <PricingSection />
        <TestimonialsSection />
        <TeamSection />
        <FAQSection />
        <InsightsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Index;
