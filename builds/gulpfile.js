const { series } = require("gulp");
const { run, withTaskName } = require("./utils");
const { buildEachComponents } = require("./build-components");

exports.default = series(
  // 1. 先删除dist
  withTaskName("1. remove dist", () => run("rm -rf dist/*")),
  // 2. 依次编译packages 下的组件
  withTaskName("2. build each components", () => {
    return new Promise((resolve) => {
      buildEachComponents().then(resolve);
    });
  })
);
