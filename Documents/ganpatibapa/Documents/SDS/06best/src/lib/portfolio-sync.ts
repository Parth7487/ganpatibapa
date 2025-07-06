// Portfolio data synchronization utility
export const PORTFOLIO_STORAGE_KEY = "portfolio_projects";

export interface PortfolioProject {
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
  beforeAfterImages: Array<{
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
  }>;
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
}

// Load projects from localStorage
export const loadPortfolioProjects = (): PortfolioProject[] => {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Error loading portfolio projects:", error);
  }

  return [];
};

// Save projects to localStorage
export const savePortfolioProjects = (projects: PortfolioProject[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error("Error saving portfolio projects:", error);
  }
};

// Get published projects only
export const getPublishedProjects = (): PortfolioProject[] => {
  return loadPortfolioProjects().filter(
    (project) => project.status === "published",
  );
};

// Convert CMS project to Work page format
export const convertToWorkPageFormat = (project: PortfolioProject) => {
  return {
    id: parseInt(project.id),
    title: project.title,
    brand: project.brand,
    description: project.description,
    image: project.image,
    videoUrl: project.videoUrl,
    category: project.category,
    tags: project.tags,
    tech: project.tech,
    metrics: project.metrics,
    liveUrl: project.liveUrl,
    featured: project.featured,
    hasVideo: project.hasVideo,
  };
};

// Sync CMS data to Work page format
export const syncToWorkPage = (): any[] => {
  const publishedProjects = getPublishedProjects();
  return publishedProjects.map(convertToWorkPageFormat);
};

// Listen for storage changes
export const onPortfolioUpdate = (
  callback: (projects: PortfolioProject[]) => void,
): (() => void) => {
  if (typeof window === "undefined") return () => {};

  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === PORTFOLIO_STORAGE_KEY && e.newValue) {
      try {
        const updatedProjects = JSON.parse(e.newValue);
        callback(updatedProjects);
      } catch (error) {
        console.error("Error parsing updated projects:", error);
      }
    }
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
};

// Clear all portfolio data (for admin use)
export const clearPortfolioData = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
};

// Export portfolio data as JSON (for backup)
export const exportPortfolioData = (): string => {
  const projects = loadPortfolioProjects();
  return JSON.stringify(projects, null, 2);
};

// Import portfolio data from JSON (for restore)
export const importPortfolioData = (jsonData: string): boolean => {
  try {
    const projects = JSON.parse(jsonData);
    savePortfolioProjects(projects);
    return true;
  } catch (error) {
    console.error("Error importing portfolio data:", error);
    return false;
  }
};
