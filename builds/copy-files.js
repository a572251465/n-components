const { packageRoot, includePackages } = require("./utils/paths");
const path = require("node:path");
const glob = require("fast-glob");
const { run } = require("./utils");

const copyFiles = async () => {
  let files = await glob(["**/*.json", "**/*.md"], {
    cwd: packageRoot,
    absolute: true,
    onlyFiles: true,
  });
  files = files.filter((filePath) =>
    includePackages.some((name) => filePath.includes(name))
  );

  const parentNames = files.map((filePath) =>
    path.dirname(filePath).replace("packages", "dist")
  );

  await Promise.all(
    files.map(async (filePath, index) => {
      await run(`cp ${filePath} ${parentNames[index]}`);
    })
  );
};

module.exports = {
  copyFiles,
};
