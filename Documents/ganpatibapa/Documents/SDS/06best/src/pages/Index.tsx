import { useState, useEffect, useMemo, memo, lazy, Suspense } from "react";
import Preloader from "../components/Preloader";
import ScrollProgress from "../components/ScrollProgress";
import ElegantNavigation from "../components/sections/ElegantNavigation";
import ElegantHero from "../components/sections/ElegantHero";
import Footer from "../components/sections/Footer";

// Lazy load heavy components that appear below the fold
const AnimatedTestimonials = lazy(
  () => import("../components/sections/AnimatedTestimonials"),
);
const VelocityScroll = lazy(() =>
  import("../components/ui/scroll-based-velocity").then((module) => ({
    default: module.VelocityScroll,
  })),
);
const AceternityTestimonials = lazy(() =>
  import("../components/ui/animated-testimonials").then((module) => ({
    default: module.AnimatedTestimonials,
  })),
);
const StatsSection = lazy(() => import("../components/sections/StatsSection"));
const FAQ = lazy(() => import("../components/sections/FAQ"));
const ProblemSolution = lazy(
  () => import("../components/sections/ProblemSolution"),
);
const Process = lazy(() => import("../components/sections/Process"));

// Minimal fallback for lazy components
const ComponentLoader = memo(() => (
  <div className="h-32 flex items-center justify-center">
    <div className="w-2 h-2 bg-beige/50 rounded-full animate-pulse"></div>
  </div>
));

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const testimonials = [
    {
      quote:
        "Working with this team transformed our e-commerce presence completely. Their attention to detail and innovative solutions exceeded our expectations.",
      name: "Sarah Chen",
      designation: "CEO, ModernTech Solutions",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      quote:
        "The performance improvements we saw after the optimization were incredible. Our site loads faster than ever and conversions have increased by 40%.",
      name: "Marcus Rodriguez",
      designation: "Founder, EcoLiving Co.",
      src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      quote:
        "From concept to launch, the team delivered exactly what we envisioned. The custom features they built set us apart from our competition.",
      name: "Emily Johnson",
      designation: "Creative Director, Artisan Crafts",
      src: "https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      quote:
        "Outstanding support and maintenance. They've been proactive in keeping our store updated and secure. Couldn't ask for a better partner.",
      name: "David Park",
      designation: "Operations Manager, TechGear Pro",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
  ];

  useEffect(() => {
    // Set dark mode by default for the landing page
    document.documentElement.classList.add("dark");

    // Prevent scrolling during preloader
    document.body.style.overflow = "hidden";

    return () => {
      // Cleanup function to maintain proper state
      document.body.style.overflow = "unset";
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoaded(true);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      {/* Preloader */}
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main application */}
      {isLoaded && (
        <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
          {/* Scroll progress bar */}
          <ScrollProgress />

          {/* Navigation */}
          <ElegantNavigation />

          {/* Main content */}
          <main className="relative">
            {/* Hero Section - Banner */}
            <div id="hero" className="relative z-20">
              <ElegantHero />
            </div>

            {/* Statistics Section */}
            <div className="relative z-20">
              <Suspense fallback={<ComponentLoader />}>
                <StatsSection />
              </Suspense>
            </div>

            {/* Process Section */}
            <div className="relative z-20">
              <Suspense fallback={<ComponentLoader />}>
                <Process />
              </Suspense>
            </div>

            {/* Animated Testimonials Section */}
            <div className="relative z-20">
              <Suspense fallback={<ComponentLoader />}>
                <AceternityTestimonials
                  testimonials={testimonials}
                  autoplay={true}
                />
              </Suspense>
            </div>

            {/* Clients Section - Testimonials */}
            <div className="relative z-20 large-content">
              <Suspense fallback={<ComponentLoader />}>
                <AnimatedTestimonials />
              </Suspense>
            </div>

            {/* FAQ Section */}
            <div className="relative z-20">
              <Suspense fallback={<ComponentLoader />}>
                <FAQ />
              </Suspense>
            </div>

            {/* Problem Solution Section */}
            <div className="relative z-20">
              <Suspense fallback={<ComponentLoader />}>
                <ProblemSolution />
              </Suspense>
            </div>
          </main>

          {/* Scroll Velocity Section */}
          <div className="relative z-20 gpu-accelerated">
            <Suspense fallback={<ComponentLoader />}>
              <VelocityScroll
                text="Shopify Development • Performance Optimization • Custom Themes • "
                default_velocity={3}
                className="text-4xl font-light text-beige motion-safe"
              />
            </Suspense>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
