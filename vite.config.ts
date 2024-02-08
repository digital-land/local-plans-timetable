import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "local-plans-timetable/form.js",
        assetFileNames: "local-plans-timetable/form.css",
      },
    },
  },
});
