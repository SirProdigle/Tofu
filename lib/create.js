const prompt = require('prompt');
const shell = require('shelljs');
const fs = require('fs');
const colors = require("colors/safe");
const path = require('path');
const copydir = require('copy-dir');
const replace = require('replace');

prompt.message = colors.green("Replace");

module.exports = (args, options, logger) => {
    const templatePath = `${__dirname}/../Tofu/`;
    const localPath = process.cwd();

    if (fs.existsSync(templatePath)) {
        logger.info('Copying Tofu Framework…');
        fs.mkdirSync(args.name);
        copydir.sync(`${templatePath}`, localPath + "/" + args.name, function (stat, filepath, filename) {
            return !(filename === "node_modules" || filename === ".idea" || filepath.includes('node_modules'));
        });
        logger.info("Tofu Copied");
        if(args["viewEngine"]) {
            const engineJson = JSON.parse(fs.readFileSync(__dirname + "/../data/engines/engines.json"));
            let engineFound = false;
            engineJson.map((obj) => {
               if(obj.name === args["viewEngine"]) {
                   engineFound = true;
                   logger.info("Copying view engine template from " + (__dirname + "/../data/engines/template." +obj.extension).yellow );
                   fs.copyFileSync(__dirname + "/../data/engines/template." +obj.extension,localPath + "/" +args.name +"/Resources/views/index." + obj.extension);
                   replace({
                       regex: "<VIEW_ENGINE>",
                       replacement: obj.expressName,
                       paths: [localPath + "/" + args.name + "/Config/express.js"],
                       recursive: true,
                       silent: true,
                   });
               }
            });
            if(!engineFound)
                logger.error(("No matching template").red + " could be found for View Engine: " + args["viewEngine"].yellow)
        }
    } else {
        logger.error("Tofu template not found in " + __dirname + "/../Tofu");
        process.exit(1);
    }
};


