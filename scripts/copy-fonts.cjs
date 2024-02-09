/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");

module.exports.copyFonts = (parentFolder) => {
  // Create the fonts directory
  fs.mkdirSync(`${parentFolder}/assets/fonts`, { recursive: true });

  // Copy the fonts
  fs.cpSync(
    "node_modules/govuk-frontend/dist/govuk/assets/fonts",
    `${parentFolder}/assets/fonts`,
    { recursive: true }
  );
};
