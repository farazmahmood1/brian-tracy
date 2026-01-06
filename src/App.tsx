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
import TermsAndPolicy from "./pages/TermsAndPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Careers from "./pages/Careers";
import JobDetails from "./pages/JobDetails";
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminJobs from "./pages/admin/Jobs";
import JobApplications from "./pages/admin/JobApplications";
import AllApplications from "./pages/admin/AllApplications";
import AdminBlogs from "./pages/admin/Blogs";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
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
              path="/admin/jobs/:jobId/applications"
              element={
                <LayoutWrapper>
                  <ProtectedRoute>
                    <JobApplications />
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
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
