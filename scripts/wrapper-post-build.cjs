// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const fs = require("fs");

fs.cpSync("dist/index.html", "dist/404.html");
