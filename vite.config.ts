import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/local-plans-timetable/",
  resolve: {
    alias: {
      "@lib": path.resolve(__dirname, "lib"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "form.js",
        assetFileNames: "form.css",
      },
    },
  },
});
