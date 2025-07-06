import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
      clientPort: 8080,
    },
    fs: {
      strict: false,
    },
    warmup: {
      clientFiles: [
        "./src/main.tsx",
        "./src/App.tsx",
        "./src/pages/Index.tsx",
        "./src/components/sections/ElegantNavigation.tsx",
        "./src/components/sections/ElegantHero.tsx",
        "./src/components/Preloader.tsx",
      ],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            if (id.includes("framer-motion")) {
              return "framer";
            }
            if (id.includes("@radix-ui")) {
              return "radix-ui";
            }
            if (id.includes("lucide-react")) {
              return "lucide";
            }
            if (id.includes("@tabler/icons-react")) {
              return "tabler";
            }
            if (id.includes("react-router")) {
              return "router";
            }
            if (id.includes("three") || id.includes("@react-three")) {
              return "three-js";
            }
            if (id.includes("@tanstack/react-query")) {
              return "query";
            }
            return "vendor";
          }
          if (id.includes("src/pages/Work.tsx")) {
            return "work-page";
          }
          if (id.includes("src/pages/")) {
            return "pages";
          }
          if (id.includes("src/components/sections/")) {
            return "sections";
          }
          if (id.includes("src/components/ui/")) {
            return "ui-components";
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split("/").pop()
            : "chunk";
          return `assets/[name]-[hash].js`;
        },
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
    },
    target: "es2020",
    minify: mode === "production" ? "terser" : "esbuild",
    terserOptions:
      mode === "production"
        ? {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ["console.log", "console.info", "console.debug"],
              passes: 2,
              unsafe_arrows: true,
              unsafe_comps: true,
              unsafe_math: true,
              unsafe_methods: true,
            },
            mangle: {
              safari10: true,
              properties: false,
            },
            format: {
              comments: false,
            },
          }
        : undefined,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    reportCompressedSize: false,
    sourcemap: false,
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "framer-motion",
      "react-router-dom",
      "lucide-react",
      "clsx",
      "tailwind-merge",
      "@radix-ui/react-tooltip",
      "@tanstack/react-query",
    ],
    exclude: ["@react-three/fiber", "@react-three/drei", "three"],
    force: false,
  },
  esbuild: {
    target: "es2020",
    legalComments: "none",
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    treeShaking: true,
  },
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
}));
