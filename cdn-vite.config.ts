import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, "dist-cdn"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, "lib/timetable-visualisation/cdn.tsx"),
      },
      output: {
        entryFileNames: "timetable-visualisation.js",
        assetFileNames: "timetable-visualisation.css",
      },
    },
  },
});
