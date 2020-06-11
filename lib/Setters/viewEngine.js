const fs = require("fs");
const colors = require("colors");
const tofuRoot = require("app-root-path");
const appRoot = require(tofuRoot +"/lib/Helpers/FindRoot")();
const replace = require('replace');
let viewEngineData = null

module.exports = (value, options, logger) => {
    if (tofuRoot === appRoot) {
        //Don't override things in Tofu proper
        logger.error("Not inside a tofu project")
    }
    const json = JSON.parse(fs.readFileSync(tofuRoot + "/data/engines/engines.json"));
    json.forEach((obj) => {
        console.info(obj.name)
        if (obj.name.includes(value)) {
            viewEngineData = obj;
        }
    });

    if (viewEngineData === null) {
        logger.error(`Tofu does not support ${value}. Use tofu show engines for a full list`);

        replace({
            regex: "viewEngine.*$",
            replacement: viewEngineData.expressName,
            paths: [`${appRoot}/Config/express.js`],
            recursive: false,
            silent: false,
        });
        fs.copyFile(`${tofuRoot}/data/engines/template.${viewEngineData.extension}`, `${appRoot}/Resources/Views/Templates/default.${viewEngineData.extension}`, (err) => {
            logger.warn(err);
        })
    }
};