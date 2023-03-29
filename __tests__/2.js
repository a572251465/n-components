const fs = require("fs/promises");
const { outDir, packageRoot } = require("../builds/utils/paths");
const path = require("path");

const dirs = (async () => {
  const dirNames = await fs.readdir(packageRoot, "utf-8");
  return dirNames
    .filter(async (name) => {
      const fullPath = path.join(packageRoot, name);
      return (await fs.stat(fullPath)).isDirectory();
    })
    .map((name) => ({
      name,
      packageRoot: path.join(packageRoot, name),
      outDir: path.join(outDir, name),
    }))
    .reduce(
      (memo, curr) => [
        ...memo,
        ...["es", "cjs"].map((item) => ({
          ...curr,
          outDir: path.join(curr.outDir, item),
        })),
      ],
      []
    );
})();