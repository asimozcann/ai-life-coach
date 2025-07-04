import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext", // modern tarayıcılar için optimize
    minify: "esbuild", // daha hızlı ve etkili minify
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Büyük kütüphaneleri ayrı chunk yap
            if (id.includes("react")) return "vendor-react";
            if (id.includes("firebase")) return "vendor-firebase";
            if (id.includes("axios")) return "vendor-axios";
            return "vendor";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // daha düzenli import
    },
  },
});
