import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-charcoal border-t border-beige/20 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto mobile-safe-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Logo and description */}
          <motion.div
            className="sm:col-span-2 lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-beige rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-xs sm:text-sm">
                  S
                </span>
              </div>
              <span className="text-gray-100 font-medium responsive-text-base">
                Shopify Dev Studio
              </span>
            </div>
            <p className="text-gray-400 font-light max-w-md text-sm sm:text-base leading-relaxed">
              Premium Shopify theme development agency creating exceptional
              e-commerce experiences that drive results and exceed expectations.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold mb-4 sm:mb-6 text-sm sm:text-base">
              Services
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="text-gray-400 hover:text-beige transition-colors duration-200 text-sm sm:text-base">
                Custom Theme Design
              </li>
              <li className="text-gray-400 hover:text-beige transition-colors duration-200 text-sm sm:text-base">
                Conversion Optimization
              </li>
              <li className="text-gray-400 hover:text-beige transition-colors duration-200 text-sm sm:text-base">
                Performance Enhance
              </li>
              <li className="text-gray-400 hover:text-beige transition-colors duration-200 text-sm sm:text-base">
                Psychology Integration
              </li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="pb-5 -mb-px"
          >
            <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">
              Resources
            </h3>
            <ul className="space-y-2">
              <li
                onClick={() => navigate("/documentation")}
                className="text-gray-400 hover:text-beige transition-colors duration-150 cursor-pointer"
              >
                Documentation
              </li>
              <li
                onClick={() => navigate("/support")}
                className="text-gray-400 hover:text-beige transition-colors duration-150 cursor-pointer mt-2"
              >
                Support
              </li>
              <li
                onClick={() => navigate("/faq")}
                className="text-gray-400 hover:text-beige transition-colors duration-150 cursor-pointer mt-2"
              >
                FAQ
              </li>
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white font-semibold mb-4 sm:mb-6 text-sm sm:text-base">
              Get in Touch
            </h4>
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              <li>
                <a
                  href="mailto:hello@shopifydevstudio.com"
                  className="text-gray-400 hover:text-beige transition-colors duration-200 text-sm sm:text-base"
                >
                  hello@shopifydevstudio.com
                </a>
              </li>
              <li className="text-gray-400 text-sm sm:text-base">
                Remote, Worldwide
              </li>
              <li className="text-gray-400 text-sm sm:text-base">
                24h Response Time
              </li>
              <li className="text-gray-400 text-sm sm:text-base">
                Available 7 days/week
              </li>
            </ul>

            {/* Urgent Project Box */}
            <div className="bg-gradient-to-r from-beige/20 to-clay/20 border border-beige/30 rounded-lg p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-beige text-base sm:text-lg">🔥</span>
                <span className="text-beige text-xs sm:text-sm font-semibold">
                  Urgent Project?
                </span>
              </div>
              <p className="text-gray-300 text-xs leading-4">
                2 emergency spaces available
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          className="border-t border-mint/20 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            © {currentYear} Shopify Dev Studio. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
