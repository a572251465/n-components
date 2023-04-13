const path = require("path");

const projectRoot = path.resolve(__dirname, "../../");
const outDir = path.resolve(__dirname, "../../dist");
const packageRoot = path.resolve(projectRoot, "./packages");
const includePackages = ["n-utils"];

module.exports = {
  projectRoot,
  outDir,
  packageRoot,
  includePackages,
};
