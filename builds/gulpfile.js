const { series } = require("gulp");
const { run, withTaskName } = require("./utils");
const { buildEachComponents } = require("./build-components");
const glob = require("fast-glob");
const { packageRoot } = require("./utils/paths");
const fs = require("fs/promises");
const { buildEachFileTypes } = require("./build-types");
const { copyFiles } = require("./copy-files");
const { editVersion } = require("./edit-version");
const { buildStyles } = require("./build-styles");

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
  // 4. 编译样式
  withTaskName("4. build styles", buildStyles),
  // 5. 拷贝 readme.md 以及package.json 等文件
  withTaskName("4. copy .json/.md files", copyFiles),
  // 6. version up
  withTaskName("5. up version", editVersion),
  // n. 删除转换文件
  withTaskName("n. remove transform file", rmTransformFiles)
);
