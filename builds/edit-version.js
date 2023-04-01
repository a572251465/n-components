const fs = require("fs/promises");
const path = require("path");
const { outDir, packageRoot } = require("./utils/paths");

const upgradeVersion = (versionNum) => {
  versionNum += "";
  if (/^[0-9]+$/gi.test(versionNum)) return Number(versionNum) + 1 + "";
  if (!!~versionNum.indexOf(".")) {
    const arr = versionNum.split(".");
    const lastVersionNum = arr.pop();
    arr.push(Number(lastVersionNum) + 1);
    return arr.join(".");
  }
  return versionNum;
};

upgradeVersion("1.0.0");

const editVersion = async () => {
  const dirs = (await fs.readdir(path.join(outDir))).filter(
    async (fileName) => {
      const newPath = path.join(outDir, fileName);
      const stat = await fs.stat(newPath);
      return stat.isDirectory();
    }
  );

  await Promise.all(
    dirs.map(async (filename) => {
      const distPath = path.join(outDir, filename);
      const packagePath = path.join(packageRoot, filename);

      // read packages folder package.json
      const packageJson = JSON.parse(
        await fs.readFile(path.join(packagePath, "package.json"), "utf-8")
      );
      packageJson["version"] = upgradeVersion(packageJson["version"]);
      await fs.writeFile(
        path.join(packagePath, "package.json"),
        JSON.stringify(packageJson, null, 2)
      );

      // read dist folder package.json
      const distJson = JSON.parse(
        await fs.readFile(path.join(distPath, "package.json"), "utf-8")
      );
      distJson["version"] = packageJson["version"];
      distJson["main"] = "cjs/index.js";
      distJson["module"] = "es/index.js";
      await fs.writeFile(
        path.join(distPath, "package.json"),
        JSON.stringify(distJson, null, 2)
      );
    })
  );
};

module.exports = {
  editVersion,
};
