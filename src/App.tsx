import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Index from "./pages/Index";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { ErrorBoundary } from "./components/ErrorBoundary";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServicePage = lazy(() => import("./pages/services/ServicePages"));
const SaasService = lazy(() => import("./pages/services/SaasService"));
const MvpService = lazy(() => import("./pages/services/MvpService"));
const EnterpriseService = lazy(() => import("./pages/services/EnterpriseService"));
const StrategyService = lazy(() => import("./pages/services/StrategyService"));
const MobileAppService = lazy(() => import("./pages/services/MobileAppService"));
const SocialMediaService = lazy(() => import("./pages/services/SocialMediaService"));
const PaidAdsService = lazy(() => import("./pages/services/PaidAdsService"));
const GoogleAdsService = lazy(() => import("./pages/services/GoogleAdsService"));
const MetaAdsService = lazy(() => import("./pages/services/MetaAdsService"));
const LinkedInAdsService = lazy(() => import("./pages/services/LinkedInAdsService"));
const TikTokAdsService = lazy(() => import("./pages/services/TikTokAdsService"));
const BingAdsService = lazy(() => import("./pages/services/BingAdsService"));
const YelpAdsService = lazy(() => import("./pages/services/YelpAdsService"));
const IndustryPage = lazy(() => import("./pages/industries/IndustryPages"));
const LegalTechPage = lazy(() => import("./pages/industries/LegalTechPage"));
const AgriculturePage = lazy(() => import("./pages/industries/AgriculturePage"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const Articles = lazy(() => import("./pages/Articles"));
const ArticleDetails = lazy(() => import("./pages/ArticleDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Contact = lazy(() => import("./pages/Contact"));
const TermsAndPolicy = lazy(() => import("./pages/TermsAndPolicy"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Careers = lazy(() => import("./pages/Careers"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminJobs = lazy(() => import("./pages/admin/Jobs"));
const AllApplications = lazy(() => import("./pages/admin/AllApplications"));
const AdminBlogs = lazy(() => import("./pages/admin/Blogs"));

const queryClient = new QueryClient();

// Eagerly preload the most common routes after initial paint so
// navigating between them never triggers the Suspense fallback.
const preloadRoutes = () => {
  import("./pages/About");
  import("./pages/Services");
  import("./pages/Contact");
};

// Content wrapper that handles layout for all pages
// Pure CSS progress bar - zero JS on scroll, uses native scroll-driven animation
const ProgressBar = () => (
  <>
    <style>{`
      @supports (animation-timeline: scroll()) {
        .scroll-progress {
          position: fixed; top: 0; left: 0; right: 0; height: 3px;
          background: hsl(var(--foreground));
          transform-origin: left;
          z-index: 100;
          scale: 0 1;
          animation: scroll-progress linear;
          animation-timeline: scroll();
        }
        @keyframes scroll-progress { to { scale: 1 1; } }
      }
    `}</style>
    <div className="scroll-progress" />
  </>
);

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  // Preload all lazy routes once after first paint so navigation is instant
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(preloadRoutes);
    } else {
      setTimeout(preloadRoutes, 1000);
    }
  }, []);

  const isProjectDetails = location.pathname.startsWith("/project/");
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProgressBar />
      <Header />
      {children}
      {!isProjectDetails && <Footer />}
    </div>
  );
};


import { ThemeProvider } from "./context/ThemeContext";
import { CookieConsent } from "./components/CookieConsent";

const App = () => (
  <ErrorBoundary>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CookieConsent />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route
              path="/"
              element={
                <LayoutWrapper>
                  <Index />
                </LayoutWrapper>
              }
            />
            <Route path="/about" element={<LayoutWrapper><About /></LayoutWrapper>} />
            <Route
              path="/services"
              element={
                <LayoutWrapper>
                  <Services />
                </LayoutWrapper>
              }
            />
            <Route path="/services/ai-automation" element={<LayoutWrapper><ServicePage page="aiAutomation" /></LayoutWrapper>} />
            <Route path="/services/custom-software" element={<LayoutWrapper><ServicePage page="customSoftware" /></LayoutWrapper>} />
            <Route path="/services/systems-integration" element={<LayoutWrapper><ServicePage page="systemsIntegration" /></LayoutWrapper>} />
            <Route path="/services/seo" element={<LayoutWrapper><ServicePage page="seoAiSearch" /></LayoutWrapper>} />
            <Route path="/services/performance-marketing" element={<LayoutWrapper><ServicePage page="performanceMarketing" /></LayoutWrapper>} />
            {/* Retired pages - permanent 301s for these also live in vercel.json */}
            <Route path="/services/ai-ml" element={<Navigate to="/services/ai-automation" replace />} />
            <Route path="/services/ux-design" element={<Navigate to="/services/custom-software" replace />} />
            <Route path="/industries/industrial-sector" element={<Navigate to="/services" replace />} />
            <Route path="/industries/decision-intelligence" element={<Navigate to="/services/systems-integration" replace />} />
            <Route path="/industries/painting" element={<Navigate to="/services" replace />} />
            <Route path="/services/saas" element={<LayoutWrapper><SaasService /></LayoutWrapper>} />
            <Route path="/services/mvp" element={<LayoutWrapper><MvpService /></LayoutWrapper>} />
            <Route path="/services/enterprise" element={<LayoutWrapper><EnterpriseService /></LayoutWrapper>} />
            <Route path="/services/strategy" element={<LayoutWrapper><StrategyService /></LayoutWrapper>} />
            <Route path="/services/mobile" element={<LayoutWrapper><MobileAppService /></LayoutWrapper>} />
            <Route path="/services/social-media" element={<LayoutWrapper><SocialMediaService /></LayoutWrapper>} />
            <Route path="/services/paid-ads" element={<LayoutWrapper><PaidAdsService /></LayoutWrapper>} />
            <Route path="/services/google-ads" element={<LayoutWrapper><GoogleAdsService /></LayoutWrapper>} />
            <Route path="/services/meta-ads" element={<LayoutWrapper><MetaAdsService /></LayoutWrapper>} />
            <Route path="/services/linkedin-ads" element={<LayoutWrapper><LinkedInAdsService /></LayoutWrapper>} />
            <Route path="/services/tiktok-ads" element={<LayoutWrapper><TikTokAdsService /></LayoutWrapper>} />
            <Route path="/services/bing-ads" element={<LayoutWrapper><BingAdsService /></LayoutWrapper>} />
            <Route path="/services/yelp-ads" element={<LayoutWrapper><YelpAdsService /></LayoutWrapper>} />
            <Route path="/industries/fintech-finance" element={<LayoutWrapper><IndustryPage page="fintech" /></LayoutWrapper>} />
            <Route path="/industries/health-wellness" element={<LayoutWrapper><IndustryPage page="health" /></LayoutWrapper>} />
            <Route path="/industries/legaltech" element={<LayoutWrapper><LegalTechPage /></LayoutWrapper>} />
            <Route path="/industries/agriculture" element={<LayoutWrapper><AgriculturePage /></LayoutWrapper>} />
            <Route path="/industries/transportation" element={<LayoutWrapper><IndustryPage page="transport" /></LayoutWrapper>} />
            <Route path="/industries/small-business" element={<LayoutWrapper><IndustryPage page="smallBusiness" /></LayoutWrapper>} />
            <Route path="/industries/mid-sized-business" element={<LayoutWrapper><IndustryPage page="midSized" /></LayoutWrapper>} />
            <Route path="/industries/government" element={<LayoutWrapper><IndustryPage page="government" /></LayoutWrapper>} />
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
              path="/terms-and-policy"
              element={
                <LayoutWrapper>
                  <TermsAndPolicy />
                </LayoutWrapper>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <LayoutWrapper>
                  <PrivacyPolicy />
                </LayoutWrapper>
              }
            />
            <Route
              path="/careers"
              element={
                <LayoutWrapper>
                  <Careers />
                </LayoutWrapper>
              }
            />
            <Route
              path="/careers/:slug"
              element={
                <LayoutWrapper>
                  <JobDetails />
                </LayoutWrapper>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/login"
              element={
                <LayoutWrapper>
                  <AdminLogin />
                </LayoutWrapper>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <LayoutWrapper>
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                </LayoutWrapper>
              }
            />
            <Route
              path="/admin/jobs"
              element={
                <LayoutWrapper>
                  <ProtectedRoute>
                    <AdminJobs />
                  </ProtectedRoute>
                </LayoutWrapper>
              }
            />
            <Route
              path="/admin/applications"
              element={
                <LayoutWrapper>
                  <ProtectedRoute>
                    <AllApplications />
                  </ProtectedRoute>
                </LayoutWrapper>
              }
            />
            <Route
              path="/admin/blogs"
              element={
                <LayoutWrapper>
                  <ProtectedRoute>
                    <AdminBlogs />
                  </ProtectedRoute>
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
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
