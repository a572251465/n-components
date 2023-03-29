const fs = require("node:fs");
const { outDir, packageRoot } = require("./utils/paths");
const path = require("node:path");

const dirs = (() => {
  const dirNames = fs.readdirSync(packageRoot, "utf-8");
  return dirNames
    .filter((name) => {
      const fullPath = path.join(packageRoot, name);
      return fs.statSync(fullPath).isDirectory();
    })
    .map((name) => [
      name,
      path.join(packageRoot, name),
      path.join(outDir, name),
    ]);
})();
