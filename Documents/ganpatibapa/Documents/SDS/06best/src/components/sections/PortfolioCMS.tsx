import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Save,
  X,
  Image as ImageIcon,
  ChevronDown,
  Eye,
  ExternalLink,
  TrendingUp,
  Zap,
  Users,
  Settings,
  Grid,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ImageUpload from "@/components/ui/image-upload";
import OptimizedImage from "@/components/OptimizedImage";

interface BeforeAfterImage {
  id: string;
  before: string;
  after: string;
  title: string;
  description: string;
  metrics: {
    conversion?: string;
    loadTime?: string;
    engagement?: string;
  };
}

interface PortfolioProject {
  id: string;
  title: string;
  brand: string;
  description: string;
  category: string;
  tags: string[];
  tech: string[];
  image: string;
  videoUrl?: string;
  liveUrl: string;
  featured: boolean;
  hasVideo: boolean;
  metrics: {
    conversion: string;
    loadTime: string;
  };
  beforeAfterImages: BeforeAfterImage[];
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
}

interface PortfolioCMSProps {
  initialProjects?: PortfolioProject[];
  onProjectsChange?: (projects: PortfolioProject[]) => void;
}

export const PortfolioCMS = ({
  initialProjects = [],
  onProjectsChange,
}: PortfolioCMSProps) => {
  const [projects, setProjects] = useState<PortfolioProject[]>(initialProjects);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showBeforeAfterModal, setShowBeforeAfterModal] = useState(false);
  const [selectedProjectForBA, setSelectedProjectForBA] = useState<
    string | null
  >(null);

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem("portfolio_projects");
    if (savedProjects) {
      try {
        const parsedProjects = JSON.parse(savedProjects);
        setProjects(parsedProjects);
        return;
      } catch (error) {
        console.error("Error loading saved projects:", error);
      }
    }
  }, []);

  // Sample initial data
  useEffect(() => {
    if (initialProjects.length === 0) {
      const sampleProjects: PortfolioProject[] = [
        {
          id: "1",
          title: "Kotn - Sustainable Fashion",
          brand: "Kotn",
          description:
            "Egyptian cotton fashion brand with sustainable supply chain storytelling and impact tracking.",
          category: "Fashion",
          tags: ["Sustainable Fashion", "Story-driven"],
          tech: ["Shopify Plus", "Custom Apps", "Mobile First"],
          image:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
          videoUrl:
            "https://player.vimeo.com/video/847503258?autoplay=1&loop=1&muted=1",
          liveUrl: "https://kotn.com/",
          featured: true,
          hasVideo: true,
          metrics: { conversion: "420%", loadTime: "0.6s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Rothy's - Sustainable Shoes",
          brand: "Rothy's",
          description:
            "Recycled material shoes with 3D knitting technology showcase and size matching tools.",
          category: "Fashion",
          tags: ["3D Technology", "Sustainability"],
          tech: ["Shopify Plus", "AR Integration", "Custom Quiz"],
          image:
            "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800",
          videoUrl:
            "https://player.vimeo.com/video/743163629?autoplay=1&loop=1&muted=1",
          liveUrl: "https://rothys.com/",
          featured: false,
          hasVideo: true,
          metrics: { conversion: "385%", loadTime: "0.7s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          title: "Fenty Beauty - Inclusive Beauty",
          brand: "Fenty Beauty",
          description:
            "Inclusive beauty brand with shade matching technology and virtual try-on experiences.",
          category: "Beauty",
          tags: ["Shade Matching", "AR Try-On"],
          tech: ["Shopify Plus", "AR Technology", "Live Chat"],
          image:
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
          videoUrl:
            "https://player.vimeo.com/video/731423904?autoplay=1&loop=1&muted=1",
          liveUrl: "https://fentybeauty.com/",
          featured: true,
          hasVideo: true,
          metrics: { conversion: "450%", loadTime: "0.5s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "4",
          title: "Herbivore Botanicals - Clean Beauty",
          brand: "Herbivore",
          description:
            "Clean beauty brand with ingredient transparency and skin analysis quiz integration.",
          category: "Beauty",
          tags: ["Clean Beauty", "Ingredient Focus"],
          tech: ["Shopify", "Quiz Integration", "Clean Code"],
          image:
            "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800",
          liveUrl: "https://herbivorebotanicals.com/",
          featured: false,
          hasVideo: false,
          metrics: { conversion: "340%", loadTime: "0.8s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "5",
          title: "Burrow - Modular Furniture",
          brand: "Burrow",
          description:
            "Modular furniture with 3D room visualization and configuration tools for custom setups.",
          category: "Home & Garden",
          tags: ["3D Visualization", "Modular Design"],
          tech: ["Shopify Plus", "3D Technology", "Custom Builder"],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
          videoUrl:
            "https://player.vimeo.com/video/736275204?autoplay=1&loop=1&muted=1",
          liveUrl: "https://burrow.com/",
          featured: false,
          hasVideo: true,
          metrics: { conversion: "375%", loadTime: "0.9s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "6",
          title: "Tuft & Needle - Sleep Innovation",
          brand: "Tuft & Needle",
          description:
            "Sleep technology brand with mattress selector quiz and sleep tracking integration.",
          category: "Home & Garden",
          tags: ["Sleep Tech", "Quiz Builder"],
          tech: ["Shopify", "Sleep Quiz", "Trial System"],
          image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
          liveUrl: "https://tuftandneedle.com/",
          featured: false,
          hasVideo: false,
          metrics: { conversion: "320%", loadTime: "0.7s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "7",
          title: "Notion - Productivity Tools",
          brand: "Notion",
          description:
            "Productivity platform with interactive demos and template marketplace integration.",
          category: "Technology",
          tags: ["Interactive Demo", "Template Market"],
          tech: ["Custom Platform", "Demo Integration", "API"],
          image:
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
          videoUrl:
            "https://player.vimeo.com/video/567890123?autoplay=1&loop=1&muted=1",
          liveUrl: "https://notion.so/",
          featured: false,
          hasVideo: true,
          metrics: { conversion: "410%", loadTime: "0.6s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "8",
          title: "Frame.io - Video Collaboration",
          brand: "Frame.io",
          description:
            "Video collaboration platform with interactive workflow demos and team management tools.",
          category: "Technology",
          tags: ["Video Platform", "Collaboration"],
          tech: ["Enterprise", "Video Tech", "Team Tools"],
          image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
          liveUrl: "https://frame.io/",
          featured: false,
          hasVideo: false,
          metrics: { conversion: "355%", loadTime: "0.8s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "9",
          title: "Thrive Market - Organic Grocery",
          brand: "Thrive Market",
          description:
            "Organic grocery delivery with membership model and personalized shopping experience.",
          category: "Food & Beverage",
          tags: ["Subscription Model", "Organic Focus"],
          tech: ["Shopify Plus", "Subscription", "Organic Certified"],
          image:
            "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
          videoUrl:
            "https://player.vimeo.com/video/789123456?autoplay=1&loop=1&muted=1",
          liveUrl: "https://thrivemarket.com/",
          featured: false,
          hasVideo: true,
          metrics: { conversion: "390%", loadTime: "0.7s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "10",
          title: "Daily Harvest - Superfood Delivery",
          brand: "Daily Harvest",
          description:
            "Superfood delivery service with nutritional tracking and meal planning tools.",
          category: "Food & Beverage",
          tags: ["Superfood", "Meal Planning"],
          tech: ["Shopify Plus", "Nutrition API", "Meal Planner"],
          image:
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
          liveUrl: "https://daily-harvest.com/",
          featured: false,
          hasVideo: false,
          metrics: { conversion: "365%", loadTime: "0.6s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "11",
          title: "Mejuri - Fine Jewelry",
          brand: "Mejuri",
          description:
            "Fine jewelry brand with virtual try-on technology and personalization features.",
          category: "Jewelry",
          tags: ["Virtual Try-On", "Fine Jewelry"],
          tech: ["Shopify Plus", "AR Technology", "Luxury Experience"],
          image:
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
          videoUrl:
            "https://player.vimeo.com/video/456789123?autoplay=1&loop=1&muted=1",
          liveUrl: "https://mejuri.com/",
          featured: true,
          hasVideo: true,
          metrics: { conversion: "425%", loadTime: "0.5s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "12",
          title: "Outdoor Voices - Athletic Wear",
          brand: "Outdoor Voices",
          description:
            "Community-driven athletic wear brand with social fitness integration and local event features.",
          category: "Fashion",
          tags: ["Community Focus", "Athletic Wear"],
          tech: ["Shopify Plus", "Community Features", "Event API"],
          image:
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800",
          videoUrl:
            "https://player.vimeo.com/video/678912345?autoplay=1&loop=1&muted=1",
          liveUrl: "https://outdoorvoices.com/",
          featured: false,
          hasVideo: true,
          metrics: { conversion: "365%", loadTime: "0.6s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "13",
          title: "Away - Smart Luggage",
          brand: "Away",
          description:
            "Smart luggage brand with travel guide integration and personalized packing recommendations.",
          category: "Technology",
          tags: ["Smart Products", "Travel Tech"],
          tech: ["Shopify Plus", "Smart Features", "Travel API"],
          image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
          liveUrl: "https://awaytravel.com/",
          featured: true,
          hasVideo: false,
          metrics: { conversion: "440%", loadTime: "0.5s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "14",
          title: "Prose - Custom Hair Care",
          brand: "Prose",
          description:
            "Personalized hair care with AI-driven formulation quiz and ingredient customization.",
          category: "Beauty",
          tags: ["AI Personalization", "Custom Formulation"],
          tech: ["Shopify Plus", "AI Integration", "Custom Quiz"],
          image:
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
          videoUrl:
            "https://player.vimeo.com/video/789123789?autoplay=1&loop=1&muted=1",
          liveUrl: "https://prose.com/",
          featured: false,
          hasVideo: true,
          metrics: { conversion: "395%", loadTime: "0.7s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "15",
          title: "Girlfriend Collective - Sustainable Activewear",
          brand: "Girlfriend Collective",
          description:
            "Sustainable activewear made from recycled materials with transparency in supply chain.",
          category: "Fashion",
          tags: ["Sustainability", "Recycled Materials"],
          tech: ["Shopify Plus", "Sustainable Tech", "Supply Chain"],
          image:
            "https://images.unsplash.com/photo-1506629905607-bea1f7b4f03a?w=800",
          liveUrl: "https://girlfriend.com/",
          featured: false,
          hasVideo: false,
          metrics: { conversion: "380%", loadTime: "0.6s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "16",
          title: "Chubbies - Men's Shorts",
          brand: "Chubbies",
          description:
            "Fun men's apparel brand with gamified shopping experience and social media integration.",
          category: "Fashion",
          tags: ["Gamification", "Social Integration"],
          tech: ["Shopify", "Gamification", "Social API"],
          image:
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
          liveUrl: "https://chubbiesshorts.com/",
          featured: false,
          hasVideo: false,
          metrics: { conversion: "355%", loadTime: "0.7s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "17",
          title: "Goop - Wellness & Lifestyle",
          brand: "Goop",
          description:
            "Luxury wellness brand with expert content integration and personalized wellness recommendations.",
          category: "Beauty",
          tags: ["Luxury Wellness", "Expert Content"],
          tech: ["Shopify Plus", "Content CMS", "Wellness API"],
          image:
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
          videoUrl:
            "https://player.vimeo.com/video/456123789?autoplay=1&loop=1&muted=1",
          liveUrl: "https://goop.com/",
          featured: false,
          hasVideo: true,
          metrics: { conversion: "415%", loadTime: "0.6s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "18",
          title: "Beardbrand - Men's Grooming",
          brand: "Beardbrand",
          description:
            "Men's grooming brand with beard care guide and virtual styling consultation features.",
          category: "Beauty",
          tags: ["Men's Grooming", "Virtual Consultation"],
          tech: ["Shopify", "Consultation System", "Video Content"],
          image:
            "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=800",
          videoUrl:
            "https://player.vimeo.com/video/321654987?autoplay=1&loop=1&muted=1",
          liveUrl: "https://beardbrand.com/",
          featured: false,
          hasVideo: true,
          metrics: { conversion: "370%", loadTime: "0.8s" },
          beforeAfterImages: [],
          status: "published",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setProjects(sampleProjects);
    }
  }, [initialProjects]);

  const categories = [
    "all",
    "Fashion",
    "Beauty",
    "Technology",
    "Food & Beverage",
    "Home & Garden",
    "Jewelry",
  ];

  const handleProjectsChange = useCallback(
    (newProjects: PortfolioProject[]) => {
      console.log(
        "CMS: Saving projects to localStorage:",
        newProjects.length,
        "projects",
      );
      setProjects(newProjects);
      // Save to localStorage for persistence
      localStorage.setItem("portfolio_projects", JSON.stringify(newProjects));
      console.log("CMS: Projects saved to localStorage successfully");
      onProjectsChange?.(newProjects);
    },
    [onProjectsChange],
  );

  const createNewProject = () => {
    const newProject: PortfolioProject = {
      id: Date.now().toString(),
      title: "New Project",
      brand: "",
      description: "",
      category: "Fashion",
      tags: [],
      tech: [],
      image: "",
      liveUrl: "",
      featured: false,
      hasVideo: false,
      metrics: { conversion: "0%", loadTime: "0s" },
      beforeAfterImages: [],
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setEditingProject(newProject);
    setIsEditing(true);
  };

  const editProject = (project: PortfolioProject) => {
    setEditingProject({ ...project });
    setIsEditing(true);
  };

  const saveProject = () => {
    if (!editingProject) return;

    console.log(
      "CMS: Saving project:",
      editingProject.title,
      "with image:",
      editingProject.image?.slice(0, 50) + "...",
    );

    const updatedProject = {
      ...editingProject,
      updatedAt: new Date().toISOString(),
    };

    const existingIndex = projects.findIndex((p) => p.id === editingProject.id);
    let newProjects;

    if (existingIndex >= 0) {
      // Update existing project
      console.log("CMS: Updating existing project at index:", existingIndex);
      newProjects = [...projects];
      newProjects[existingIndex] = updatedProject;
    } else {
      // Add new project
      console.log("CMS: Adding new project");
      newProjects = [...projects, updatedProject];
    }

    // Update state and persist to localStorage
    handleProjectsChange(newProjects);

    // Close editing modal
    setIsEditing(false);
    setEditingProject(null);

    // Show success message
    setTimeout(() => {
      const message = `Project saved successfully! Total projects: ${newProjects.length}`;
      alert(message);
      console.log("CMS: " + message);
    }, 100);
  };

  const deleteProject = (id: string) => {
    const newProjects = projects.filter((p) => p.id !== id);
    handleProjectsChange(newProjects);
  };

  const addBeforeAfterImage = (projectId: string) => {
    setSelectedProjectForBA(projectId);
    setShowBeforeAfterModal(true);
  };

  const saveBeforeAfterImage = (
    projectId: string,
    baImage: BeforeAfterImage,
  ) => {
    const newProjects = projects.map((project) => {
      if (project.id === projectId) {
        return {
          ...project,
          beforeAfterImages: [...project.beforeAfterImages, baImage],
          updatedAt: new Date().toISOString(),
        };
      }
      return project;
    });
    handleProjectsChange(newProjects);

    // Show success message
    setTimeout(() => {
      alert("Before/After comparison added successfully!");
    }, 100);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesStatus = filter === "all" || project.status === filter;
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    return matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-charcoal text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-beige mb-2">
              Portfolio CMS
            </h1>
            <p className="text-gray-400">
              Manage your portfolio projects and before/after comparisons
            </p>
          </div>
          <Button
            onClick={createNewProject}
            className="elegant-button flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Project
          </Button>
        </div>

        {/* Filters and Controls */}
        <Card className="elegant-card mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">View:</span>
                <div className="flex border border-beige/20 rounded-lg overflow-hidden">
                  <Button
                    onClick={() => setViewMode("grid")}
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    className={
                      viewMode === "grid" ? "bg-beige text-black" : "text-beige"
                    }
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => setViewMode("list")}
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    className={
                      viewMode === "list" ? "bg-beige text-black" : "text-beige"
                    }
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4">
                {/* Status Filter */}
                <div className="relative">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-graphite border border-beige/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-beige/50"
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-graphite border border-beige/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-beige/50"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Total: {projects.length}</span>
                <span>
                  Published:{" "}
                  {projects.filter((p) => p.status === "published").length}
                </span>
                <span>
                  Drafts: {projects.filter((p) => p.status === "draft").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid/List */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className={`elegant-card hover:border-beige/40 transition-all duration-300 ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                {/* Project Image */}
                <div
                  className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-video"} overflow-hidden`}
                >
                  {project.image ? (
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      width={400}
                      height={viewMode === "list" ? 200 : 240}
                    />
                  ) : (
                    <div className="w-full h-full bg-graphite flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  )}

                  {/* Status Badge */}
                  <Badge
                    className={`absolute top-2 left-2 ${
                      project.status === "published"
                        ? "bg-green-500/20 text-green-400"
                        : project.status === "draft"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {project.status}
                  </Badge>

                  {project.featured && (
                    <Badge className="absolute top-2 right-2 bg-beige/20 text-beige">
                      Featured
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4 flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-white mb-1">
                        {project.title}
                      </h3>
                      <p className="text-beige text-sm font-medium">
                        {project.brand}
                      </p>
                    </div>

                    {/* Action Dropdown */}
                    <div className="relative group">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-beige"
                      >
                        <Settings className="w-4 h-4" />
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </Button>

                      {/* Dropdown Menu */}
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 0, y: -10, scale: 0.95 }}
                        whileHover={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute right-0 top-full mt-1 w-48 bg-graphite border border-beige/20 rounded-lg shadow-xl z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <div className="p-2 space-y-1">
                          <button
                            onClick={() => editProject(project)}
                            className="w-full text-left px-3 py-2 text-sm text-white hover:bg-beige/10 rounded flex items-center gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            Edit Project
                          </button>

                          <button
                            onClick={() => addBeforeAfterImage(project.id)}
                            className="w-full text-left px-3 py-2 text-sm text-white hover:bg-beige/10 rounded flex items-center gap-2"
                          >
                            <ImageIcon className="w-4 h-4" />
                            Add Before/After
                          </button>

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full text-left px-3 py-2 text-sm text-white hover:bg-beige/10 rounded"
                            >
                              <div className="flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" />
                                View Live
                              </div>
                            </a>
                          )}

                          <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-beige/10 rounded flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Preview
                          </button>

                          <div className="border-t border-beige/10 my-1"></div>

                          <button
                            onClick={() => deleteProject(project.id)}
                            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-charcoal/50 rounded-lg p-2 text-center">
                      <div className="flex items-center justify-center gap-1 text-green-400 text-sm font-bold">
                        <TrendingUp className="w-3 h-3" />
                        {project.metrics.conversion}
                      </div>
                      <div className="text-gray-400 text-xs">Conversion</div>
                    </div>
                    <div className="bg-charcoal/50 rounded-lg p-2 text-center">
                      <div className="flex items-center justify-center gap-1 text-beige text-sm font-bold">
                        <Zap className="w-3 h-3" />
                        {project.metrics.loadTime}
                      </div>
                      <div className="text-gray-400 text-xs">Load Time</div>
                    </div>
                  </div>

                  {/* Before/After Images Count */}
                  {project.beforeAfterImages.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-beige">
                      <ImageIcon className="w-4 h-4" />
                      <span>
                        {project.beforeAfterImages.length} Before/After
                        Comparison
                        {project.beforeAfterImages.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Edit Project Modal */}
        <AnimatePresence>
          {isEditing && editingProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-charcoal border border-beige/20 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-beige">
                    {editingProject.id ? "Edit Project" : "Create New Project"}
                  </h2>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Basic Information */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            title: e.target.value,
                          })
                        }
                        className="w-full bg-graphite border border-beige/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-beige/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Brand
                      </label>
                      <input
                        type="text"
                        value={editingProject.brand}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            brand: e.target.value,
                          })
                        }
                        className="w-full bg-graphite border border-beige/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-beige/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={editingProject.description}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            description: e.target.value,
                          })
                        }
                        rows={4}
                        className="w-full bg-graphite border border-beige/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-beige/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={editingProject.category}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            category: e.target.value,
                          })
                        }
                        className="w-full bg-graphite border border-beige/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-beige/50"
                      >
                        {categories
                          .filter((cat) => cat !== "all")
                          .map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  {/* Media & Settings */}
                  <div className="space-y-4">
                    <div>
                      <ImageUpload
                        value={editingProject.image}
                        onChange={(value) =>
                          setEditingProject({ ...editingProject, image: value })
                        }
                        label="Project Image"
                        placeholder="Upload main project image"
                        previewSize="lg"
                        maxSize={10}
                      />
                    </div>

                    {editingProject.hasVideo && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Video URL
                        </label>
                        <input
                          type="url"
                          value={editingProject.videoUrl || ""}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              videoUrl: e.target.value,
                            })
                          }
                          className="w-full bg-graphite border border-beige/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-beige/50"
                          placeholder="Enter video embed URL"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Live URL
                      </label>
                      <input
                        type="url"
                        value={editingProject.liveUrl}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            liveUrl: e.target.value,
                          })
                        }
                        className="w-full bg-graphite border border-beige/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-beige/50"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Conversion Rate
                        </label>
                        <input
                          type="text"
                          value={editingProject.metrics.conversion}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              metrics: {
                                ...editingProject.metrics,
                                conversion: e.target.value,
                              },
                            })
                          }
                          className="w-full bg-graphite border border-beige/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-beige/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Load Time
                        </label>
                        <input
                          type="text"
                          value={editingProject.metrics.loadTime}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              metrics: {
                                ...editingProject.metrics,
                                loadTime: e.target.value,
                              },
                            })
                          }
                          className="w-full bg-graphite border border-beige/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-beige/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        value={editingProject.status}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            status: e.target.value as any,
                          })
                        }
                        className="w-full bg-graphite border border-beige/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-beige/50"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={editingProject.featured}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              featured: e.target.checked,
                            })
                          }
                          className="text-beige"
                        />
                        <span className="text-sm text-gray-300">Featured</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={editingProject.hasVideo}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              hasVideo: e.target.checked,
                            })
                          }
                          className="text-beige"
                        />
                        <span className="text-sm text-gray-300">Has Video</span>
                      </label>
                    </div>

                    {/* Project Gallery */}
                    <div className="border-t border-beige/20 pt-4 mt-6">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">
                        Before/After Gallery
                      </h4>
                      {editingProject.beforeAfterImages.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">
                          {editingProject.beforeAfterImages.map(
                            (baImage, index) => (
                              <Card
                                key={baImage.id}
                                className="bg-charcoal/30 border-beige/10"
                              >
                                <CardContent className="p-3">
                                  <div className="aspect-video bg-graphite/50 rounded mb-2 overflow-hidden">
                                    {baImage.before && (
                                      <OptimizedImage
                                        src={baImage.before}
                                        alt={baImage.title}
                                        className="w-full h-full object-cover"
                                        width={200}
                                        height={112}
                                      />
                                    )}
                                  </div>
                                  <p className="text-xs text-white font-medium truncate">
                                    {baImage.title}
                                  </p>
                                  <p className="text-xs text-gray-400 truncate">
                                    {baImage.description}
                                  </p>
                                </CardContent>
                              </Card>
                            ),
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-6 border border-dashed border-beige/20 rounded-lg">
                          <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-400">
                            No before/after images yet
                          </p>
                          <p className="text-xs text-gray-500">
                            Add comparisons using the dropdown menu
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-beige/20">
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={saveProject}
                    className="elegant-button flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Project
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Before/After Modal */}
        <BeforeAfterModal
          isOpen={showBeforeAfterModal}
          onClose={() => {
            setShowBeforeAfterModal(false);
            setSelectedProjectForBA(null);
          }}
          onSave={(baImage) => {
            if (selectedProjectForBA) {
              saveBeforeAfterImage(selectedProjectForBA, baImage);
              setShowBeforeAfterModal(false);
              setSelectedProjectForBA(null);
            }
          }}
        />
      </div>
    </div>
  );
};

// Before/After Modal Component
interface BeforeAfterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (baImage: BeforeAfterImage) => void;
}

const BeforeAfterModal = ({
  isOpen,
  onClose,
  onSave,
}: BeforeAfterModalProps) => {
  const [baImage, setBaImage] = useState<BeforeAfterImage>({
    id: "",
    before: "",
    after: "",
    title: "",
    description: "",
    metrics: {},
  });

  const handleSave = () => {
    const newBaImage = {
      ...baImage,
      id: Date.now().toString(),
    };
    onSave(newBaImage);
    setBaImage({
      id: "",
      before: "",
      after: "",
      title: "",
      description: "",
      metrics: {},
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-charcoal border border-beige/20 rounded-xl p-6 max-w-2xl w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-beige">
                Add Before/After Comparison
              </h2>
              <Button onClick={onClose} variant="ghost" size="sm">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={baImage.title}
                  onChange={(e) =>
                    setBaImage({ ...baImage, title: e.target.value })
                  }
                  className="w-full bg-graphite border border-beige/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-beige/50"
                  placeholder="e.g., Homepage Redesign"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={baImage.description}
                  onChange={(e) =>
                    setBaImage({ ...baImage, description: e.target.value })
                  }
                  rows={3}
                  className="w-full bg-graphite border border-beige/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-beige/50"
                  placeholder="Describe the transformation..."
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <ImageUpload
                    value={baImage.before}
                    onChange={(value) =>
                      setBaImage({ ...baImage, before: value })
                    }
                    label="Before Image"
                    placeholder="Upload or enter URL for before image"
                    previewSize="md"
                    maxSize={8}
                  />
                </div>
                <div>
                  <ImageUpload
                    value={baImage.after}
                    onChange={(value) =>
                      setBaImage({ ...baImage, after: value })
                    }
                    label="After Image"
                    placeholder="Upload or enter URL for after image"
                    previewSize="md"
                    maxSize={8}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Conversion Improvement
                  </label>
                  <input
                    type="text"
                    value={baImage.metrics.conversion || ""}
                    onChange={(e) =>
                      setBaImage({
                        ...baImage,
                        metrics: {
                          ...baImage.metrics,
                          conversion: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-graphite border border-beige/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-beige/50"
                    placeholder="+340%"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Load Time Improvement
                  </label>
                  <input
                    type="text"
                    value={baImage.metrics.loadTime || ""}
                    onChange={(e) =>
                      setBaImage({
                        ...baImage,
                        metrics: {
                          ...baImage.metrics,
                          loadTime: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-graphite border border-beige/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-beige/50"
                    placeholder="-75%"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Engagement Improvement
                  </label>
                  <input
                    type="text"
                    value={baImage.metrics.engagement || ""}
                    onChange={(e) =>
                      setBaImage({
                        ...baImage,
                        metrics: {
                          ...baImage.metrics,
                          engagement: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-graphite border border-beige/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-beige/50"
                    placeholder="+250%"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 mt-6 pt-6 border-t border-beige/20">
              <Button onClick={onClose} variant="ghost">
                Cancel
              </Button>
              <Button onClick={handleSave} className="elegant-button">
                <Save className="w-4 h-4 mr-2" />
                Save Comparison
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PortfolioCMS;
