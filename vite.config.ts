import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Target modern browsers — smaller, faster output
    target: "es2020",
    // Warn when any chunk exceeds 600KB
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunk splitting — keeps initial bundle small
        manualChunks: {
          // React core — rarely changes, benefits from long cache
          "vendor-react": ["react", "react-dom"],
          // Routing + data fetching
          "vendor-query": [
            "@tanstack/react-query",
            "@trpc/client",
            "@trpc/react-query",
            "wouter",
            "superjson",
          ],
          // Animation — large, lazy-load potential
          "vendor-motion": ["framer-motion"],
          // Charts — only needed on a few pages
          "vendor-charts": ["recharts"],
          // Radix UI primitives — large but needed on most pages
          "vendor-radix": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-select",
            "@radix-ui/react-slot",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-popover",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-separator",
            "@radix-ui/react-switch",
            "@radix-ui/react-avatar",
            "@radix-ui/react-progress",
            "@radix-ui/react-toggle",
          ],
        },
      },
    },
  },
  server: {
    host: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
