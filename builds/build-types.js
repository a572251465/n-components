const { Project } = require("ts-morph");
const path = require("path");
const fs = require("fs/promises");
const {
  outDir,
  projectRoot,
  packageRoot,
  includePackages,
} = require("./utils/paths");
const { readDir } = require("./utils");

const computedAllDirs = async () => {
  const dirNames = (await fs.readdir(packageRoot, "utf-8")).filter((name) =>
    includePackages.includes(name)
  );
  return dirNames
    .filter(async (name) => {
      const fullPath = path.join(packageRoot, name);
      return (await fs.stat(fullPath)).isDirectory();
    })
    .map((name) => ({
      name,
      packageRoot: path.join(packageRoot, name),
      outDir: path.join(outDir, name),
    }));
};

const buildEachFileTypes = async () => {
  const allDirs = await computedAllDirs();
  await Promise.all(
    allDirs.map(async (item) => {
      await buildTypes(item.packageRoot, item.outDir);
    })
  );
};

const buildTypes = async (packageRoot, outDir) => {
  const project = new Project({
    // 生成.d.ts 我们需要有一个tsconfig
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
      outDir: path.resolve(outDir, "types"),
      baseUrl: projectRoot,
      paths: {},
      skipLibCheck: true,
      strict: false,
    },
    tsConfigFilePath: path.resolve(projectRoot, "tsconfig.json"),
    skipAddingFilesFromTsConfig: true,
  });
  const filePaths = readDir(packageRoot, [
    "transform.js",
    "json",
    "md",
    "less",
    "css",
  ]);

  const sourceFiles = [];

  await Promise.all(
    filePaths.map(async function (file) {
      const sourceFile = project.addSourceFileAtPath(file);
      sourceFiles.push(sourceFile);
    })
  );
  await project.emit({
    // 默认是放到内存中的
    emitOnlyDtsFiles: true,
  });

  const tasks = sourceFiles.map(async (sourceFile) => {
    const emitOutput = sourceFile.getEmitOutput();
    const tasks = emitOutput.getOutputFiles().map(async (outputFile) => {
      const filepath = outputFile.getFilePath();
      await fs.mkdir(path.dirname(filepath), {
        recursive: true,
      });
      await fs.writeFile(filepath, outputFile.getText());
    });
    await Promise.all(tasks);
  });

  await Promise.all(tasks);
};

module.exports = {
  buildEachFileTypes,
};
