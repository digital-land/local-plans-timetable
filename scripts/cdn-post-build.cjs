/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");

// Create the fonts directory
fs.mkdirSync("dist-cdn/assets/fonts", { recursive: true });

// Copy the fonts
fs.cpSync(
  "node_modules/govuk-frontend/dist/govuk/assets/fonts",
  "dist-cdn/assets/fonts",
  { recursive: true }
);

// Rewrite the font paths
const css = fs
  .readFileSync("dist-cdn/timetable-visualisation.css")
  .toString()
  .replace(/url\(\/assets\/fonts/g, "url(./assets/fonts");
fs.writeFileSync("dist-cdn/timetable-visualisation.css", css);
