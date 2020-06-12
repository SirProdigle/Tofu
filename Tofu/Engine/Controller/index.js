const express = require("express");
const appRoot = require("app-root-path");
const Logger = require(appRoot + "/Engine/Logger");

class Controller {

    //Path is e.g blog so the /blog that this controller acts for
    constructor(path = null) {
        if (path == null) {
            Logger.error(`No controller path found in ${this.constructor.name}::super(). Expects e.g super("blogs")`);
            process.exit(1);
        }
        this.router = express.Router([]);
        this.router.path = path;
        try {
            Logger.debug(`Including controller middleware: ${appRoot}../../Startup/Controller/${this.router.path.charAt(0).toUpperCase()}${this.router.path.slice(1)}Startup`);
            const middleware = require(`${appRoot}../../Startup/Controller/${this.router.path.charAt(0).toUpperCase()}${this.router.path.slice(1)}Startup`);
            for (const middle in middleware) {
                this.router.use(middleware[middle]);
            }
            Logger.verbose("Controller: " + path + " created with middleware");
        }
        catch (e) {
            Logger.verbose("Controller: " + path + " created");
        }

    }

}

module.exports = Controller;




