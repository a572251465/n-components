const { parallel } = require("gulp");
const fs = require("node:fs");
const path = require("path");
const { packageRoot, includePackages, outDir } = require("./utils/paths");
const less = require("gulp-less");
const gulp = require("gulp");

const dirs = fs
  .readdirSync(packageRoot)
  .filter((name) => includePackages.includes(name))
  .map((name) => ({
    name,
    outDir: path.join(outDir, name),
    inputDir: path.join(packageRoot, name),
  }));

const buildStyles = async () => {
  await Promise.all(
    dirs.map((item) => {
      return new Promise((resolve) => {
        gulp
          .src(path.join(item.inputDir, "**/*.less"))
          .pipe(less({ paths: [path.join(__dirname, "less", "includes")] }))
          .pipe(gulp.dest(path.join(item.outDir)).on("finish", resolve));
      });
    })
  );
  await Promise.all(
    dirs.map((item) => {
      return new Promise((resolve) => {
        gulp
          .src(path.join(item.inputDir, "**/*.css"))
          .pipe(gulp.dest(path.join(item.outDir)).on("finish", resolve));
      });
    })
  );
};

module.exports = {
  buildStyles,
};
