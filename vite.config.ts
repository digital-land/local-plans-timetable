import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/local-plans-timetable/",
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "form.js",
        assetFileNames: "form.css",
      },
    },
  },
});
