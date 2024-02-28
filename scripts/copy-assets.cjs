/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");

module.exports.copyAssets = (assetFolder, parentFolder) => {
  // Create the asset directory
  fs.mkdirSync(`${parentFolder}/assets/${assetFolder}`, { recursive: true });

  // Copy the asset
  fs.cpSync(
    `node_modules/govuk-frontend/dist/govuk/assets/${assetFolder}`,
    `${parentFolder}/assets/${assetFolder}`,
    { recursive: true }
  );
};
