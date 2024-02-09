/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");

const { copyFonts } = require("./copy-fonts.cjs");

copyFonts("dist-cdn");

// Rewrite the font paths
const css = fs
  .readFileSync("dist-cdn/timetable-visualisation.css")
  .toString()
  .replace(/url\(\/assets\/fonts/g, "url(./assets/fonts");
fs.writeFileSync("dist-cdn/timetable-visualisation.css", css);
