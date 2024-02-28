// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { copyAssets } = require("./copy-assets.cjs");

copyAssets("fonts", "public");
copyAssets("images", "public");
