import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, memo } from "react";
import ScrollToTop from "./components/ScrollToTop";

// Import only critical pages directly for faster initial load
import Index from "./pages/Index";

// Lazy load all other pages for better performance
const Services = lazy(() => import("./pages/Services"));
const Process = lazy(() => import("./pages/Process"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Documentation = lazy(() => import("./pages/Documentation"));
const Support = lazy(() => import("./pages/Support"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Work = lazy(() =>
  import("./pages/Work").then((module) => ({
    default: module.default,
  })),
);
const NotFound = lazy(() => import("./pages/NotFound"));

// Ultra-minimal loading component for faster rendering
const MinimalLoader = memo(() => (
  <div className="h-16 bg-black flex items-center justify-center">
    <div className="w-3 h-3 border border-beige border-t-transparent rounded-full animate-spin"></div>
  </div>
));

// Optimized QueryClient for better performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      gcTime: 1000 * 60 * 15, // 15 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      retryDelay: 1000,
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = memo(() => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider delayDuration={200}>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/services"
            element={
              <Suspense fallback={<MinimalLoader />}>
                <Services />
              </Suspense>
            }
          />
          <Route
            path="/process"
            element={
              <Suspense fallback={<MinimalLoader />}>
                <Process />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<MinimalLoader />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/work"
            element={
              <Suspense fallback={<MinimalLoader />}>
                <Work />
              </Suspense>
            }
          />
          <Route
            path="/blog"
            element={
              <Suspense fallback={<MinimalLoader />}>
                <Blog />
              </Suspense>
            }
          />
          <Route
            path="/documentation"
            element={
              <Suspense fallback={<MinimalLoader />}>
                <Documentation />
              </Suspense>
            }
          />
          <Route
            path="/support"
            element={
              <Suspense fallback={<MinimalLoader />}>
                <Support />
              </Suspense>
            }
          />
          <Route
            path="/faq"
            element={
              <Suspense fallback={<MinimalLoader />}>
                <FAQ />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<MinimalLoader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
));

App.displayName = "App";

export default App;
