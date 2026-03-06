import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useRef } from "react";
import Index from "./pages/Index";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollToTop } from "./components/ScrollToTop";
import { motion, useScroll, useSpring } from "framer-motion";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";

const Services = lazy(() => import("./pages/Services"));
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

// Content wrapper that handles layout for all pages
const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Check if on project details page
  const isProjectDetails = location.pathname.startsWith("/project/");
  // Check if admin page
  const isAdmin = location.pathname.startsWith("/admin");

  // Progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {children}
      </div>
    );
  }

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


import { ThemeProvider } from "./context/ThemeContext";
import { CookieConsent } from "./components/CookieConsent";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CookieConsent />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={null}>
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
              path="/services"
              element={
                <LayoutWrapper>
                  <Services />
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
);

export default App;
