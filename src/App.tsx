import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Articles from "./pages/Articles";
import ArticleDetails from "./pages/ArticleDetails";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollToTop } from "./components/ScrollToTop";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const queryClient = new QueryClient();

// Content wrapper that handles layout for all pages
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Check if on project details page
  const isProjectDetails = location.pathname.startsWith("/project/");

  // Progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
    >
      {/* Custom cursor */}
      <CustomCursor />

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-foreground origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Header - show on all pages */}
      <Header />

      {/* Page content */}
      {children}

      {/* Footer - hide on project details page */}
      {!isProjectDetails && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <LayoutWrapper>
                <Index />
              </LayoutWrapper>
            }
          />
          <Route
            path="/projects"
            element={
              <LayoutWrapper>
                <Projects />
              </LayoutWrapper>
            }
          />
          <Route
            path="/project/:id"
            element={
              <LayoutWrapper>
                <ProjectDetails />
              </LayoutWrapper>
            }
          />
          <Route
            path="/articles"
            element={
              <LayoutWrapper>
                <Articles />
              </LayoutWrapper>
            }
          />
          <Route
            path="/articles/:id"
            element={
              <LayoutWrapper>
                <ArticleDetails />
              </LayoutWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <LayoutWrapper>
                <Contact />
              </LayoutWrapper>
            }
          />
          <Route
            path="*"
            element={
              <LayoutWrapper>
                <NotFound />
              </LayoutWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
