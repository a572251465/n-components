const { getBabelInputPlugin } = require("@rollup/plugin-babel");
const commonJs = require("@rollup/plugin-commonjs");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const { rollup } = require("rollup");
const fs = require("node:fs");
const path = require("node:path");
const { packageRoot, outDir } = require("./utils/paths");
const esbuild = require("esbuild");

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

const buildEachComponents = async () => {
  const builds = async (name, inputFilePath, outputFilePath) => {
    esbuild.buildSync({
      entryPoints: [path.join(inputFilePath, "index.ts")],
      format: "esm",
      bundle: true,
      external: ["vue"],
      outfile: path.join(inputFilePath, "index.transform.js"),
    });

    const rollupInputOptions = {
      input: path.join(inputFilePath, "index.transform.js"),
      plugins: [
        getBabelInputPlugin({
          plugins: ["@vue/babel-plugin-jsx"],
          babelHelpers: "bundled",
        }),
        commonJs(),
        nodeResolve(),
      ],
      external: (id) => /vue/.test(id),
    };
    const rollupOutputOptions = ["cjs", "es"].map((format) => ({
      file: path.join(outputFilePath, format, `index.js`),
      format,
      exports: "named",
    }));

    const bundle = await rollup(rollupInputOptions);
    return Promise.all(
      rollupOutputOptions.map((option) => bundle.write(option))
    );
  };
  return Promise.all(dirs.map((item) => builds(...item)));
};

module.exports = {
  buildEachComponents,
};
