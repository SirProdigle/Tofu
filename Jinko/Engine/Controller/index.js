const express = require("express");
const approot = require("app-root-path");
const Logger = require(approot + "/Engine/Logger");

class Controller {

    //Path is e.g blog so the /blog that this controller acts for
    constructor(path = null) {
        if (path == null) {
            throw new Error('No controller path found in super()');
        }
        this.router = express.Router([]);
        this.router.path = path;
        try {
            Logger.debug(`Including controller middleware: ${approot}../../Startup/Controller/${this.router.path.charAt(0).toUpperCase()}${this.router.path.slice(1)}Startup`);
            const middleware = require(`${approot}../../Startup/Controller/${this.router.path.charAt(0).toUpperCase()}${this.router.path.slice(1)}Startup`);
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




