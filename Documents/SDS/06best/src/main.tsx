import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Get the root element
const container = document.getElementById("root")!;

// Create root with optimized settings for performance
const root = createRoot(container, {
  identifierPrefix: "app",
  // Enable concurrent features for better performance
  onRecoverableError: (error) => {
    console.error("React recoverable error:", error);
  },
});

// Use startTransition for faster initial render
import { startTransition } from "react";

startTransition(() => {
  root.render(<App />);
});
