import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogPage from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CreativeCorner from "./pages/CreativeCorner";
import Photography from "./pages/Photography";
import Writing from "./pages/Writing";
import Experiments from "./pages/Experiments";
import SignatureBook from "./pages/SignatureBook";
import Links from "./pages/Links";
import Loader from "./components/Loader";
import PageTransition from "./components/PageTransition";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/projects"
          element={
            <PageTransition>
              <Projects />
            </PageTransition>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <PageTransition>
              <ProjectDetail />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/blog"
          element={
            <PageTransition>
              <BlogPage />
            </PageTransition>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <PageTransition>
              <BlogPost />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/creative"
          element={
            <PageTransition>
              <CreativeCorner />
            </PageTransition>
          }
        />
        <Route
          path="/creative/photography"
          element={
            <PageTransition>
              <Photography />
            </PageTransition>
          }
        />
        <Route
          path="/creative/writing"
          element={
            <PageTransition>
              <Writing />
            </PageTransition>
          }
        />
        <Route
          path="/creative/experiments"
          element={
            <PageTransition>
              <Experiments />
            </PageTransition>
          }
        />
        <Route
          path="/signature-book"
          element={
            <PageTransition>
              <SignatureBook />
            </PageTransition>
          }
        />
        <Route
          path="/links"
          element={
            <PageTransition>
              <Links />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Loader />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
