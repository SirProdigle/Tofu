const fs = require("fs");
const colors = require("colors");
const tofuRoot = require("app-root-path");
const appRoot = require(tofuRoot +"/lib/Helpers/FindRoot");
const replace = require('replace-in-file');
const npm = require("npm-programmatic")
const localPath = process.cwd();
let viewEngineData = null

module.exports = (value, options, logger) => {
    if (tofuRoot === appRoot) {
        //Don't override things in Tofu proper
        logger.error("Not inside a tofu project")
    }
    const json = JSON.parse(fs.readFileSync(tofuRoot + "/data/engines/engines.json"));
    json.forEach((obj) => {
        if (obj.name.includes(value)) {
            viewEngineData = obj;
        }
    });

    if (viewEngineData === null) {
        logger.error(`Tofu does not support ${value}. Use tofu show engines for a full list`);
        return;
    }
    var res =replace.sync({
            from: new RegExp("viewEngine.*"),
            to: "viewEngine: " +"\"" + viewEngineData.expressName + "\"",
            files: `${appRoot}/Config/express.js`
        });
    fs.promises.copyFile(`${tofuRoot}/data/engines/template.${viewEngineData.extension}`, `${appRoot}/Resources/Views/Templates/default.${viewEngineData.extension}`).catch (err => logger.warn(err)).then(() => logger.info(`View Template ${viewEngineData.expressName} has been copied successfully`))
    npm.install(viewEngineData.expressName, {save:true}).catch(e => logger.error(`Failed to install npm package '${viewEngineData.expressName}'. Please install manually`))
    logger.info("NPM package " + viewEngineData.expressName + " installed")
}
