import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const ElegantNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleNavigation = (itemId: string, itemLabel: string) => {
    // Close mobile menu
    setIsMobileMenuOpen(false);

    if (itemId === "hero") {
      // Go to home page
      navigate("/");
    } else if (itemLabel === "Services") {
      // Go to services page
      navigate("/services");
    } else if (itemLabel === "Process") {
      // Go to process page
      navigate("/process");
    } else if (itemLabel === "About") {
      // Go to about page
      navigate("/about");
    } else if (itemLabel === "Work") {
      // Go to work page
      navigate("/work");
    } else if (location.pathname === "/") {
      // If on home page, scroll to section
      const element = document.getElementById(itemId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on other pages, go to home page and then scroll
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(itemId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Background overlay */}
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              className="relative flex flex-col h-full bg-black/95 backdrop-blur-md"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Mobile menu header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 border border-beige/60 rounded flex items-center justify-center">
                    <span className="text-beige font-medium text-xs">S</span>
                  </div>
                  <span className="text-gray-100 font-medium text-base tracking-wide">
                    Dev Studio
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-beige transition-colors duration-200 p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile navigation links */}
              <div className="flex-1 flex flex-col justify-center px-6 pb-20">
                <nav className="space-y-8">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavigation(item.id, item.label)}
                      className={`block w-full text-left text-2xl sm:text-3xl font-medium tracking-wide transition-colors duration-300 ${
                        isActiveItem(item.id, item.label)
                          ? "text-beige"
                          : "text-gray-300 hover:text-beige"
                      }`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      {item.label}
                      {isActiveItem(item.id, item.label) && (
                        <motion.div
                          className="w-12 h-0.5 bg-beige mt-2"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </nav>

                {/* Mobile CTA Button */}
                <motion.div
                  className="mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    onClick={() => handleNavigation("contact", "Contact")}
                    className="w-full elegant-button px-6 py-4 text-base font-medium tracking-wide rounded transition-all duration-300"
                  >
                    Start the Conversation
                  </Button>
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
