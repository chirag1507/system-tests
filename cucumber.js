module.exports = {
  default: {
    paths: ["src/acceptance/features/**/*.feature"],
    require: ["src/acceptance/steps/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress-bar", "html:cucumber-report.html", "json:cucumber-report.json"],
  },
};
