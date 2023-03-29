const path = require("path");
const glob = require("fast-glob");
(async function () {
  const res = await glob("**/*.js", {
    cwd: path.join(__dirname, "../packages"),
    absolute: true,
    onlyFiles: true,
  });
  console.log(res);
})();
