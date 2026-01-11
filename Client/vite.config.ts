import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Do not emit source maps in production builds
    sourcemap: false,
  },
  // Strip console.* and debugger in production bundles
  esbuild: mode === "production" ? { drop: ["console", "debugger"] } : {},
}))