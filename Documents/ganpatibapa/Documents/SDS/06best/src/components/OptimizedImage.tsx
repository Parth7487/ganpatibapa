import { useState, useCallback } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  quality?: number;
}

const OptimizedImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  loading = "eager", // Changed default to eager for faster loading
  quality = 75,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  // Create placeholder for better UX
  const placeholderSrc = `data:image/svg+xml;base64,${btoa(
    `<svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a1a1a"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#666" text-anchor="middle" dy=".3em">Loading...</text>
    </svg>`,
  )}`;

  if (hasError) {
    return (
      <div
        className={`bg-gray-800 flex items-center justify-center text-gray-400 text-sm ${className}`}
        style={{ width: width || "100%", height: height || "auto" }}
      >
        Failed to load image
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <img
          src={placeholderSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-150 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        decoding="async"
        style={{
          contentVisibility: "auto",
          containIntrinsicSize: `${width || 400}px ${height || 300}px`,
        }}
      />
    </div>
  );
};

export default OptimizedImage;
