const prompt = require('prompt');
const shell = require('shelljs');
const fs = require('fs');
const colors = require("colors/safe");
const path = require('path');
const copydir = require('copy-dir');
const replace = require('replace-in-file');
const rimraf = require('rimraf');
const npm = require("npm-programmatic")

prompt.message = colors.green("Replace");

module.exports = async (args, options, logger) => {
    const templatePath = `${__dirname}/../Tofu/`;
    const localPath = process.cwd();

    if (fs.existsSync(templatePath)) {
        logger.info('Copying Tofu Framework…');
        fs.mkdirSync(args.name);
        copydir.sync(`${templatePath}`, localPath + "/" + args.name, function (stat, filepath, filename) {
            return !(filename === "node_modules" || filename === ".idea" || filepath.includes('node_modules'));
        });
        if(args["viewEngine"] !== "none") {
            const engineJson = JSON.parse(fs.readFileSync(__dirname + "/../data/engines/engines.json"));
            let engineFound = false;
            engineJson.map((obj) => {
               if(obj.name.includes(args["viewEngine"])) {
                   engineFound = true;
                   logger.info("Copying view engine template from " + (__dirname + "/../data/engines/template." +obj.extension).yellow );
                   fs.copyFileSync(__dirname + "/../data/engines/template." +obj.extension,localPath + "/" +args.name +"/Resources/Views/Templates/default." + obj.extension);
                   replace.sync({
                       from: "<VIEW_ENGINE>",
                       to: obj.expressName,
                       files: localPath + "/" + args.name + "/Config/express.js",
                   });
                   fs.writeFileSync(localPath + "/" + args.name + "/Resources/Views/index." + obj.extension,"<h1>Welcome To Tofu!</h1>")
                   logger.info("Installing Express package for " + obj.name)
                   npm.install(obj.name, {save: true, cwd: `${localPath}/${args.name}`}).catch(e => logger.error(`Failed to install npm package '${obj.name}'. Please install manually`))
               }
            });
            if(!engineFound)
                logger.error(("No matching template").red + " could be found for View Engine: " + args["viewEngine"].yellow)
        }
        else {
            replace.sync({
                from: "<VIEW_ENGINE>",
                to: ' ',
                files: localPath + "/" + args.name + "/Config/express.js",
            });
        }

        //Manager Installs
        if (args["manager"] === "pm2") {
            logger.info("Setting up PM2 management")
            replace.sync({
                from: "<COMMAND>",
                to: "pm2 start",
                files: localPath + "/" + args.name + "/package.json",
            });
            await npm.install("pm2",{save: true, cwd: `${localPath}/${args.name}`}).catch(err => {
                logger.error(`Npm could not install pm2, please check package.json file : ${err}`);})
            fs.copyFileSync(__dirname + "/../data/ecosystem.config.js",localPath + "/" +args.name +"/ecosystem.config.js");
            replace.sync({
                from: "<NAME>",
                to: args.name,
                files: localPath + "/" + args.name + "/ecosystem.config.js",
            });

        }
        else if (args["manager"] === "nodemon") {
            logger.info("Setting up PM2 management")
            replace.sync({
                from: "<COMMAND>",
                to: "nodemon Engine/Bin/app.js --ignore './Resources/JS/' --ignore './Public/JS/'",
                files: localPath + "/" + args.name + "/package.json",
            });
            await npm.install("nodemon",{save: true, cwd: `${localPath}/${args.name}`}).catch(err => {
                logger.error(`Npm could not install Nodemon, please check package.json file : ${err}`);})
        }
        else {
            replace.sync({
                from: "<COMMAND>",
                to: "node Engine/Bin/app.js",
                files: localPath + "/" + args.name + "/package.json",
            });
        }


        if(options["noExamples"]) {
            rimraf.sync(localPath + "/" + args.name + "/" + "Examples");
        }
        logger.info("Installing required packages...")
        await npm.install(".",{save: true, cwd: `${localPath}/${args.name}`}).catch(err => {
            logger.error(`Npm could not install packages for ${args.name}, please check package.json file : ${err}`);
        });
        logger.info(`Project ${args.name} created`)
    } else {
        logger.error("Tofu template not found in " + __dirname + "/../Tofu");
        process.exit(1);
    }
};


