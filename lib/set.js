module.exports = (args, options, logger) => {
    const fs = require("fs");
    const colors = require("colors");
    const appRoot = require("./Helpers/FindRoot");
    const tofuRoot = require("app-root-path");

    const option = args["option"];
    const setterFound = fs.existsSync(`${tofuRoot}/lib/Setters/${option}.js`);
    if(!setterFound) {
        logger.error(`Option ${option} does not exist. Use tofu show options for full list`)
    }
    else {
        require(tofuRoot +`/lib/Setters/${option}.js`)(args["value"],options,logger);
    }
};