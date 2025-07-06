import { motion } from "framer-motion";
import { useState, useMemo, memo } from "react";
import {
  ExternalLink,
  Play,
  Search,
  Filter,
  Star,
  TrendingUp,
  Zap,
  ShoppingCart,
} from "lucide-react";
import ElegantNavigation from "../components/sections/ElegantNavigation";
import Footer from "../components/sections/Footer";
import OptimizedImage from "../components/OptimizedImage";
import ImageComparisonSection from "../components/sections/ImageComparisonSection";
import {
  useScrollReveal,
  scrollRevealVariants,
  staggerContainerVariants,
  fadeInUpVariants,
} from "../hooks/use-scroll-reveal";

const Work = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const heroRef = useScrollReveal();

  // Portfolio projects with comprehensive details
  const portfolioProjects = [
    {
      id: 1,
      title: "Kotn - Sustainable Fashion",
      brand: "Kotn",
      description:
        "Egyptian cotton fashion brand with sustainable supply chain storytelling and impact tracking.",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      videoUrl:
        "https://player.vimeo.com/video/847503258?autoplay=1&loop=1&muted=1",
      category: "Fashion",
      tags: ["Sustainable Fashion", "Story-driven"],
      tech: ["Shopify Plus", "Custom Apps", "Mobile First"],
      metrics: {
        conversion: "420%",
        loadTime: "0.6s",
      },
      liveUrl: "https://kotn.com/",
      featured: true,
      hasVideo: true,
    },
    {
      id: 2,
      title: "Rothy's - Sustainable Shoes",
      brand: "Rothy's",
      description:
        "Recycled material shoes with 3D knitting technology showcase and size matching tools.",
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800",
      videoUrl:
        "https://player.vimeo.com/video/743163629?autoplay=1&loop=1&muted=1",
      category: "Fashion",
      tags: ["3D Technology", "Sustainability"],
      tech: ["Shopify Plus", "AR Integration", "Custom Quiz"],
      metrics: {
        conversion: "385%",
        loadTime: "0.7s",
      },
      liveUrl: "https://rothys.com/",
      featured: false,
      hasVideo: true,
    },
    {
      id: 3,
      title: "Fenty Beauty - Inclusive Beauty",
      brand: "Fenty Beauty",
      description:
        "Inclusive beauty brand with shade matching technology and virtual try-on experiences.",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
      videoUrl:
        "https://player.vimeo.com/video/731423904?autoplay=1&loop=1&muted=1",
      category: "Beauty",
      tags: ["Shade Matching", "AR Try-On"],
      tech: ["Shopify Plus", "AR Technology", "Live Chat"],
      metrics: {
        conversion: "450%",
        loadTime: "0.5s",
      },
      liveUrl: "https://fentybeauty.com/",
      featured: true,
      hasVideo: true,
    },
    {
      id: 4,
      title: "Herbivore Botanicals - Clean Beauty",
      brand: "Herbivore",
      description:
        "Clean beauty brand with ingredient transparency and skin analysis quiz integration.",
      image:
        "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800",
      category: "Beauty",
      tags: ["Clean Beauty", "Ingredient Focus"],
      tech: ["Shopify", "Quiz Integration", "Clean Code"],
      metrics: {
        conversion: "340%",
        loadTime: "0.8s",
      },
      liveUrl: "https://herbivorebotanicals.com/",
      featured: false,
      hasVideo: false,
    },
    {
      id: 5,
      title: "Burrow - Modular Furniture",
      brand: "Burrow",
      description:
        "Modular furniture with 3D room visualization and configuration tools for custom setups.",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      videoUrl:
        "https://player.vimeo.com/video/736275204?autoplay=1&loop=1&muted=1",
      category: "Home & Garden",
      tags: ["3D Visualization", "Modular Design"],
      tech: ["Shopify Plus", "3D Technology", "Custom Builder"],
      metrics: {
        conversion: "375%",
        loadTime: "0.9s",
      },
      liveUrl: "https://burrow.com/",
      featured: false,
      hasVideo: true,
    },
    {
      id: 6,
      title: "Tuft & Needle - Sleep Innovation",
      brand: "Tuft & Needle",
      description:
        "Sleep technology brand with mattress selector quiz and sleep tracking integration.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
      category: "Home & Garden",
      tags: ["Sleep Tech", "Quiz Builder"],
      tech: ["Shopify", "Sleep Quiz", "Trial System"],
      metrics: {
        conversion: "320%",
        loadTime: "0.7s",
      },
      liveUrl: "https://tuftandneedle.com/",
      featured: false,
      hasVideo: false,
    },
    {
      id: 7,
      title: "Notion - Productivity Tools",
      brand: "Notion",
      description:
        "Productivity platform with interactive demos and template marketplace integration.",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
      videoUrl:
        "https://player.vimeo.com/video/567890123?autoplay=1&loop=1&muted=1",
      category: "Technology",
      tags: ["Interactive Demo", "Template Market"],
      tech: ["Custom Platform", "Demo Integration", "API"],
      metrics: {
        conversion: "410%",
        loadTime: "0.6s",
      },
      liveUrl: "https://notion.so/",
      featured: false,
      hasVideo: true,
    },
    {
      id: 8,
      title: "Frame.io - Video Collaboration",
      brand: "Frame.io",
      description:
        "Video collaboration platform with interactive workflow demos and team management tools.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      category: "Technology",
      tags: ["Video Platform", "Collaboration"],
      tech: ["Enterprise", "Video Tech", "Team Tools"],
      metrics: {
        conversion: "355%",
        loadTime: "0.8s",
      },
      liveUrl: "https://frame.io/",
      featured: false,
      hasVideo: false,
    },
    {
      id: 9,
      title: "Thrive Market - Organic Grocery",
      brand: "Thrive Market",
      description:
        "Organic grocery delivery with membership model and personalized shopping experience.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
      videoUrl:
        "https://player.vimeo.com/video/789123456?autoplay=1&loop=1&muted=1",
      category: "Food & Beverage",
      tags: ["Subscription Model", "Organic Focus"],
      tech: ["Shopify Plus", "Subscription", "Organic Certified"],
      metrics: {
        conversion: "390%",
        loadTime: "0.7s",
      },
      liveUrl: "https://thrivemarket.com/",
      featured: false,
      hasVideo: true,
    },
    {
      id: 10,
      title: "Daily Harvest - Superfood Delivery",
      brand: "Daily Harvest",
      description:
        "Superfood delivery service with nutritional tracking and meal planning tools.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      category: "Food & Beverage",
      tags: ["Superfood", "Meal Planning"],
      tech: ["Shopify Plus", "Nutrition API", "Meal Planner"],
      metrics: {
        conversion: "365%",
        loadTime: "0.6s",
      },
      liveUrl: "https://daily-harvest.com/",
      featured: false,
      hasVideo: false,
    },
    {
      id: 11,
      title: "Mejuri - Fine Jewelry",
      brand: "Mejuri",
      description:
        "Fine jewelry brand with virtual try-on technology and personalization features.",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
      videoUrl:
        "https://player.vimeo.com/video/456789123?autoplay=1&loop=1&muted=1",
      category: "Jewelry",
      tags: ["Virtual Try-On", "Fine Jewelry"],
      tech: ["Shopify Plus", "AR Technology", "Luxury Experience"],
      metrics: {
        conversion: "425%",
        loadTime: "0.5s",
      },
      liveUrl: "https://mejuri.com/",
      featured: true,
      hasVideo: true,
    },
    {
      id: 12,
      title: "Outdoor Voices - Athletic Wear",
      brand: "Outdoor Voices",
      description:
        "Community-driven athletic wear brand with social fitness integration and local event features.",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800",
      videoUrl:
        "https://player.vimeo.com/video/678912345?autoplay=1&loop=1&muted=1",
      category: "Fashion",
      tags: ["Community Focus", "Athletic Wear"],
      tech: ["Shopify Plus", "Community Features", "Event API"],
      metrics: {
        conversion: "365%",
        loadTime: "0.6s",
      },
      liveUrl: "https://outdoorvoices.com/",
      featured: false,
      hasVideo: true,
    },
    {
      id: 13,
      title: "Away - Smart Luggage",
      brand: "Away",
      description:
        "Smart luggage brand with travel guide integration and personalized packing recommendations.",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      category: "Technology",
      tags: ["Smart Products", "Travel Tech"],
      tech: ["Shopify Plus", "Smart Features", "Travel API"],
      metrics: {
        conversion: "440%",
        loadTime: "0.5s",
      },
      liveUrl: "https://awaytravel.com/",
      featured: true,
      hasVideo: false,
    },
    {
      id: 14,
      title: "Prose - Custom Hair Care",
      brand: "Prose",
      description:
        "Personalized hair care with AI-driven formulation quiz and ingredient customization.",
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
      videoUrl:
        "https://player.vimeo.com/video/789123789?autoplay=1&loop=1&muted=1",
      category: "Beauty",
      tags: ["AI Personalization", "Custom Formulation"],
      tech: ["Shopify Plus", "AI Integration", "Custom Quiz"],
      metrics: {
        conversion: "395%",
        loadTime: "0.7s",
      },
      liveUrl: "https://prose.com/",
      featured: false,
      hasVideo: true,
    },
    {
      id: 15,
      title: "Girlfriend Collective - Sustainable Activewear",
      brand: "Girlfriend Collective",
      description:
        "Sustainable activewear made from recycled materials with transparency in supply chain.",
      image:
        "https://images.unsplash.com/photo-1506629905607-bea1f7b4f03a?w=800",
      category: "Fashion",
      tags: ["Sustainability", "Recycled Materials"],
      tech: ["Shopify Plus", "Sustainable Tech", "Supply Chain"],
      metrics: {
        conversion: "380%",
        loadTime: "0.6s",
      },
      liveUrl: "https://girlfriend.com/",
      featured: false,
      hasVideo: false,
    },
    {
      id: 16,
      title: "Chubbies - Men's Shorts",
      brand: "Chubbies",
      description:
        "Fun men's apparel brand with gamified shopping experience and social media integration.",
      image:
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
      category: "Fashion",
      tags: ["Gamification", "Social Integration"],
      tech: ["Shopify", "Gamification", "Social API"],
      metrics: {
        conversion: "355%",
        loadTime: "0.7s",
      },
      liveUrl: "https://chubbiesshorts.com/",
      featured: false,
      hasVideo: false,
    },
    {
      id: 17,
      title: "Goop - Wellness & Lifestyle",
      brand: "Goop",
      description:
        "Luxury wellness brand with expert content integration and personalized wellness recommendations.",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
      videoUrl:
        "https://player.vimeo.com/video/456123789?autoplay=1&loop=1&muted=1",
      category: "Beauty",
      tags: ["Luxury Wellness", "Expert Content"],
      tech: ["Shopify Plus", "Content CMS", "Wellness API"],
      metrics: {
        conversion: "415%",
        loadTime: "0.6s",
      },
      liveUrl: "https://goop.com/",
      featured: false,
      hasVideo: true,
    },
    {
      id: 18,
      title: "Beardbrand - Men's Grooming",
      brand: "Beardbrand",
      description:
        "Men's grooming brand with beard care guide and virtual styling consultation features.",
      image:
        "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=800",
      videoUrl:
        "https://player.vimeo.com/video/321654987?autoplay=1&loop=1&muted=1",
      category: "Beauty",
      tags: ["Men's Grooming", "Virtual Consultation"],
      tech: ["Shopify", "Consultation System", "Video Content"],
      metrics: {
        conversion: "370%",
        loadTime: "0.8s",
      },
      liveUrl: "https://beardbrand.com/",
      featured: false,
      hasVideo: true,
    },
  ];

  const categories = [
    { name: "All Projects", count: 18 },
    { name: "Fashion", count: 8 },
    { name: "Beauty", count: 6 },
    { name: "Home & Garden", count: 2 },
    { name: "Technology", count: 3 },
    { name: "Food & Beverage", count: 2 },
    { name: "Jewelry", count: 1 },
  ];

  // Optimized filter projects with useMemo for better performance
  const filteredProjects = useMemo(() => {
    return portfolioProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      const matchesCategory =
        selectedCategory === "All Projects" ||
        project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-charcoal text-white">
      <ElegantNavigation />

      {/* Hero Section with Animated Background */}
      <section className="relative py-20 px-8 bg-gradient-to-b from-charcoal to-charcoal/80 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-beige/5 rounded-full filter blur-[64px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-beige/5 rounded-full filter blur-[64px] animate-pulse animation-delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Our <span className="text-beige">Portfolio</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            Discover our collection of high-converting Shopify stores that
            combine stunning design with powerful performance optimization.
          </motion.p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-charcoal py-6 sm:py-8">
        <div className="max-w-[1152px] mx-auto mobile-safe-padding">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="flex-1 relative max-w-full sm:max-w-[448px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-graphite border border-charcoal rounded-lg py-3 pl-9 sm:pl-10 pr-4 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-beige/50 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-beige" />
              <span className="text-gray-400 text-xs sm:text-sm">
                Filter by category:
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.name
                    ? "bg-beige text-charcoal shadow-lg"
                    : "bg-graphite text-gray-400 hover:bg-graphite/80"
                }`}
              >
                <span>{category.name}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedCategory === category.name
                      ? "bg-charcoal/20 text-charcoal"
                      : "bg-beige/20 text-beige"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1280px] mx-auto mobile-safe-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-xl sm:rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                  project.featured
                    ? "bg-gradient-to-br from-beige/10 to-beige/5 border-beige/30"
                    : "bg-graphite border-charcoal"
                }`}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 z-10 bg-beige text-charcoal text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    <span>Featured</span>
                  </div>
                )}

                {/* Media Container */}
                <div className="relative overflow-hidden">
                  {project.hasVideo ? (
                    <div className="aspect-video relative">
                      <iframe
                        src={project.videoUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                      <div className="absolute top-4 right-4 bg-beige text-charcoal text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2">
                        <Play className="w-3 h-3" />
                        <span>Video</span>
                      </div>
                    </div>
                  ) : (
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                      width={400}
                      height={192}
                      loading={project.featured ? "eager" : "lazy"}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-1 sm:gap-0">
                    <h3 className="responsive-text-base font-bold transition-colors duration-300 hover:text-beige">
                      {project.title}
                    </h3>
                    <span className="text-beige text-xs sm:text-sm font-medium">
                      {project.brand}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-charcoal border border-beige/20 text-beige text-xs px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-beige/20 text-beige text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 text-center">
                    <div className="bg-charcoal rounded-lg p-2 sm:p-3">
                      <div className="flex items-center justify-center gap-1 text-green-400 text-sm sm:text-lg font-bold">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{project.metrics.conversion}</span>
                      </div>
                      <div className="text-gray-400 text-xs">Conversion</div>
                    </div>
                    <div className="bg-charcoal rounded-lg p-2 sm:p-3">
                      <div className="flex items-center justify-center gap-1 text-beige text-sm sm:text-lg font-bold">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{project.metrics.loadTime}</span>
                      </div>
                      <div className="text-gray-400 text-xs">Load Time</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-beige text-sm font-medium hover:text-beige/80 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit Live Site</span>
                    </a>
                    <button className="flex items-center gap-1 text-gray-400 text-sm font-medium hover:text-gray-300 transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                      <span>Before/After</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Comparison Section */}
      <ImageComparisonSection />

      {/* Our Process Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black to-charcoal/20">
        <div className="max-w-6xl mx-auto mobile-safe-padding">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainerVariants}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.h2
              variants={fadeInUpVariants}
              className="responsive-text-3xl font-bold mb-4 sm:mb-6"
            >
              Our <span className="text-beige">Design Process</span>
            </motion.h2>
            <motion.p
              variants={fadeInUpVariants}
              className="responsive-text-base text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              From concept to conversion, we follow a proven methodology that
              delivers results
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: "01",
                title: "Research & Strategy",
                description:
                  "Deep dive into your brand, audience, and competitors to create a conversion-focused strategy",
                icon: "🔍",
              },
              {
                step: "02",
                title: "Design & Development",
                description:
                  "Create pixel-perfect designs and build lightning-fast, mobile-optimized stores",
                icon: "⚡",
              },
              {
                step: "03",
                title: "Test & Optimize",
                description:
                  "Continuous A/B testing and optimization to maximize your conversion rates",
                icon: "📊",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                className="relative p-8 bg-gradient-to-br from-graphite/50 to-charcoal/30 border border-beige/10 rounded-2xl hover:border-beige/20 transition-all duration-300"
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <div className="text-beige text-sm font-medium mb-2">
                  STEP {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results & Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-charcoal/30">
        <div className="max-w-6xl mx-auto mobile-safe-padding">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainerVariants}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.h2
              variants={fadeInUpVariants}
              className="responsive-text-3xl font-bold mb-4 sm:mb-6"
            >
              Proven <span className="text-beige">Results</span>
            </motion.h2>
            <motion.p
              variants={fadeInUpVariants}
              className="responsive-text-base text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Our data-driven approach consistently delivers measurable
              improvements
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            {[
              {
                number: "380%",
                label: "Average Conversion Increase",
                icon: TrendingUp,
              },
              { number: "0.6s", label: "Average Load Time", icon: Zap },
              { number: "150+", label: "Stores Launched", icon: ShoppingCart },
              { number: "98%", label: "Client Satisfaction", icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                className="text-center p-4 sm:p-6 bg-gradient-to-br from-beige/10 to-beige/5 border border-beige/20 rounded-xl sm:rounded-2xl"
              >
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-beige mx-auto mb-3 sm:mb-4" />
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-beige mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Technologies We Use */}
          <motion.div
            variants={staggerContainerVariants}
            className="text-center"
          >
            <motion.h3
              variants={fadeInUpVariants}
              className="responsive-text-lg font-bold mb-6 sm:mb-8"
            >
              Technologies We Master
            </motion.h3>
            <motion.div
              variants={fadeInUpVariants}
              className="flex flex-wrap justify-center gap-2 sm:gap-4"
            >
              {[
                "Shopify Plus",
                "React",
                "TypeScript",
                "Liquid",
                "JavaScript",
                "CSS3",
                "HTML5",
                "Node.js",
                "GraphQL",
                "REST APIs",
                "Figma",
                "Adobe Creative Suite",
                "Git",
                "Vercel",
              ].map((tech, index) => (
                <span
                  key={index}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-graphite border border-beige/20 text-beige text-xs sm:text-sm rounded-full hover:bg-beige/10 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainerVariants}
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeInUpVariants}
            className="bg-gradient-to-r from-beige/10 to-clay/10 border border-beige/20 rounded-2xl p-12"
          >
            <motion.h2
              variants={fadeInUpVariants}
              className="text-4xl font-bold mb-6"
            >
              Ready to Create Your{" "}
              <span className="text-beige">Success Story?</span>
            </motion.h2>
            <motion.p
              variants={fadeInUpVariants}
              className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto"
            >
              Let's build a store that not only looks amazing but also converts
              visitors into loyal customers. Your competitors won't know what
              hit them.
            </motion.p>
            <motion.div
              variants={fadeInUpVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="px-8 py-4 bg-beige text-black font-semibold rounded-lg hover:bg-beige/90 transition-all duration-300 transform hover:scale-105">
                Start Your Project
              </button>
              <button className="px-8 py-4 border border-beige text-beige font-semibold rounded-lg hover:bg-beige/10 transition-all duration-300">
                Free Store Analysis
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

Work.displayName = "Work";

export default memo(Work);
