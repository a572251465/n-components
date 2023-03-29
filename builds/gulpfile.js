const { series } = require("gulp");
const { run, withTaskName } = require("./utils");
const { buildEachComponents } = require("./build-components");
const glob = require("fast-glob");
const { packageRoot } = require("./utils/paths");
const fs = require("fs/promises");
const { buildEachFileTypes } = require("./build-types");

const rmTransformFiles = async () => {
  const files = await glob("**/*.js", {
    cwd: packageRoot,
    absolute: true,
    onlyFiles: true,
  });
  return Promise.all(files.map((filePath) => fs.unlink(filePath)));
};

exports.default = series(
  // 1. 先删除dist
  withTaskName("1. remove dist", () => run("rm -rf dist/*")),
  // 2. 依次编译packages 下的组件
  withTaskName("2. build each components", () => {
    return new Promise((resolve) => {
      buildEachComponents().then(resolve);
    });
  }),
  // 3. 编译提取ts 类型
  withTaskName("3. build ts type", buildEachFileTypes),
  // n. 删除转换文件
  withTaskName("4. remove transform file", rmTransformFiles)
);
