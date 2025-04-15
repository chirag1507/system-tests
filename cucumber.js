module.exports = {
  default: {
    paths: ["src/acceptance/features/**/*.feature"],
    require: ["src/acceptance/steps/**/*.ts", "src/acceptance/support/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress", "html:cucumber-report.html", "json:cucumber-report.json"],
  },
};
