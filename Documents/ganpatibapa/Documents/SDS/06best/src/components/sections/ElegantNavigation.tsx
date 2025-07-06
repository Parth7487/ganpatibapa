import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const ElegantNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only track sections on the home page
      if (location.pathname === "/") {
        const sections = ["hero", "services", "work", "about", "contact"];
        const currentSection = sections.find((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });

        if (currentSection) {
          setActiveSection(currentSection);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleNavigation = useCallback(
    (itemId: string, itemLabel: string) => {
      // Close mobile menu and dropdown
      setIsMobileMenuOpen(false);
      setShowMobileDropdown(false);

      if (itemId === "hero") {
        navigate("/");
      } else if (itemLabel === "Services") {
        navigate("/services");
      } else if (itemLabel === "Process") {
        navigate("/process");
      } else if (itemLabel === "About") {
        navigate("/about");
      } else if (itemLabel === "Work") {
        navigate("/work");
      } else if (location.pathname === "/") {
        const element = document.getElementById(itemId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        navigate("/");
        requestAnimationFrame(() => {
          setTimeout(() => {
            const element = document.getElementById(itemId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 100);
        });
      }
    },
    [navigate, location.pathname],
  );

  // Handle touch interactions for better mobile UX
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isMobileMenuOpen) return;

      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;

      // Close menu on swipe up
      if (diff > 100) {
        setIsMobileMenuOpen(false);
      }
    },
    [isMobileMenuOpen, touchStartY],
  );

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowMobileDropdown(false);
  }, [location.pathname]);

  // Enhanced body scroll prevention for mobile
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (isMobileMenuOpen) {
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${window.scrollY}px`;
      body.style.width = "100%";
      html.style.scrollBehavior = "auto";
    } else {
      const scrollY = body.style.top;
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      html.style.scrollBehavior = "smooth";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      html.style.scrollBehavior = "smooth";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "services", label: "Services" },
    { id: "process", label: "Process" },
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
  ];

  const isActiveItem = (itemId: string, itemLabel: string) => {
    if (location.pathname === "/" && activeSection === itemId) {
      return true;
    }
    if (location.pathname === "/services" && itemLabel === "Services") {
      return true;
    }
    if (location.pathname === "/process" && itemLabel === "Process") {
      return true;
    }
    if (location.pathname === "/about" && itemLabel === "About") {
      return true;
    }
    if (location.pathname === "/work" && itemLabel === "Work") {
      return true;
    }
    return false;
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-sm border-b border-gray-800/50"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 border border-beige/60 rounded flex items-center justify-center">
                <span className="text-beige font-medium text-xs sm:text-sm">
                  S
                </span>
              </div>
              <span className="text-gray-100 font-medium text-base sm:text-lg tracking-wide">
                Dev Studio
              </span>
            </motion.div>

            {/* Desktop Navigation links */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item.id, item.label)}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isActiveItem(item.id, item.label)
                      ? "text-beige"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                  {isActiveItem(item.id, item.label) && (
                    <motion.div
                      className="absolute bottom-[-6px] left-0 right-0 h-px bg-beige"
                      layoutId="activeIndicator"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden sm:block">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => handleNavigation("contact", "Contact")}
                  className="elegant-button px-4 lg:px-6 py-2 text-xs lg:text-sm font-medium tracking-wide rounded transition-all duration-300"
                >
                  <span className="hidden md:inline">
                    Start the Conversation
                  </span>
                  <span className="md:hidden">Contact</span>
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="lg:hidden text-gray-300 hover:text-beige transition-colors duration-200 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {/* Background overlay with enhanced blur */}
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu content with improved animations */}
            <motion.div
              className="relative flex flex-col h-full bg-gradient-to-b from-black/98 via-charcoal/95 to-black/98 backdrop-blur-xl border-l border-beige/10"
              initial={{ x: "100%", scale: 0.95 }}
              animate={{ x: 0, scale: 1 }}
              exit={{ x: "100%", scale: 0.95 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                duration: 0.4,
              }}
            >
              {/* Mobile menu header with enhanced styling */}
              <div className="flex items-center justify-between p-5 sm:p-6 border-b border-beige/20 bg-gradient-to-r from-transparent to-beige/5">
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-8 h-8 border border-beige/60 rounded flex items-center justify-center bg-beige/10">
                    <span className="text-beige font-medium text-xs">S</span>
                  </div>
                  <span className="text-gray-100 font-medium text-base tracking-wide">
                    Dev Studio
                  </span>
                </motion.div>

                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-beige transition-colors duration-200 p-2 rounded-full hover:bg-beige/10"
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Enhanced mobile navigation with dropdown */}
              <div className="flex-1 flex flex-col justify-start pt-8 px-6 pb-20 overflow-y-auto">
                {/* Quick access dropdown */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    onClick={() => setShowMobileDropdown(!showMobileDropdown)}
                    className="flex items-center justify-between w-full bg-beige/10 border border-beige/20 rounded-xl p-4 text-beige hover:bg-beige/20 transition-all duration-300"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-medium">Quick Navigation</span>
                    <motion.div
                      animate={{ rotate: showMobileDropdown ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {showMobileDropdown && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mt-3 bg-charcoal/50 border border-beige/10 rounded-xl overflow-hidden"
                      >
                        {[
                          {
                            label: "Portfolio",
                            action: () => handleNavigation("work", "Work"),
                          },
                          {
                            label: "Testimonials",
                            action: () =>
                              handleNavigation("testimonials", "Testimonials"),
                          },
                          {
                            label: "Contact",
                            action: () =>
                              handleNavigation("contact", "Contact"),
                          },
                        ].map((item, index) => (
                          <motion.button
                            key={index}
                            onClick={item.action}
                            className="w-full text-left px-4 py-3 text-gray-300 hover:text-beige hover:bg-beige/10 transition-all duration-200 border-b border-beige/5 last:border-b-0"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ x: 10 }}
                          >
                            {item.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Main navigation links */}
                <nav className="space-y-6">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavigation(item.id, item.label)}
                      className={`group block w-full text-left relative ${
                        isActiveItem(item.id, item.label)
                          ? "text-beige"
                          : "text-gray-300 hover:text-beige"
                      }`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between py-3 px-4 rounded-xl group-hover:bg-beige/5 transition-all duration-300">
                        <span className="text-xl sm:text-2xl font-medium tracking-wide">
                          {item.label}
                        </span>
                        <motion.div
                          className="w-2 h-2 rounded-full bg-beige/30"
                          animate={{
                            scale: isActiveItem(item.id, item.label)
                              ? [1, 1.5, 1]
                              : 1,
                            backgroundColor: isActiveItem(item.id, item.label)
                              ? "rgba(230, 177, 126, 1)"
                              : "rgba(230, 177, 126, 0.3)",
                          }}
                          transition={{
                            duration: 1,
                            repeat: isActiveItem(item.id, item.label)
                              ? Infinity
                              : 0,
                          }}
                        />
                      </div>

                      {isActiveItem(item.id, item.label) && (
                        <motion.div
                          className="absolute left-4 bottom-0 bg-beige h-0.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "2rem" }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      )}
                    </motion.button>
                  ))}
                </nav>

                {/* Enhanced Mobile CTA Section */}
                <motion.div
                  className="mt-12 space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    onClick={() => handleNavigation("contact", "Contact")}
                    className="w-full elegant-button px-6 py-4 text-base font-medium tracking-wide rounded-xl transition-all duration-300 shadow-lg hover:shadow-beige/20"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Start the Conversation
                    </motion.span>
                  </Button>

                  {/* Additional quick actions */}
                  <div className="flex gap-3">
                    <motion.button
                      className="flex-1 py-3 px-4 border border-beige/30 text-beige rounded-xl hover:bg-beige/10 transition-all duration-300 text-sm font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Portfolio
                    </motion.button>
                    <motion.button
                      className="flex-1 py-3 px-4 border border-beige/30 text-beige rounded-xl hover:bg-beige/10 transition-all duration-300 text-sm font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Call Us
                    </motion.button>
                  </div>
                </motion.div>

                {/* Swipe indicator */}
                <motion.div
                  className="flex justify-center mt-8 opacity-60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 1.2 }}
                >
                  <motion.div
                    className="w-8 h-1 bg-beige/40 rounded-full"
                    animate={{
                      scaleX: [1, 0.8, 1],
                      opacity: [0.6, 0.3, 0.6],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ElegantNavigation;
