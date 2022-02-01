const express = require("express");
const appRoot = require("app-root-path");
const Logger = require(appRoot + "/Engine/Logger");
const config = require(`${appRoot}/Config`)
const fs = require("fs")

class Controller {

    //Path is e.g blog so the /blog that this controller acts for
    constructor(path = null, api=false) {
        if (path == null) {
            Logger.error(`No controller path found in ${this.constructor.name}::super(). Expects e.g super("blogs")`);
            process.exit(1);
        }
        else if (path == '/') {
            path = '' //If we allow '/' as a prefix then all subsequent routes become '//thing'
        }
        this.router = express.Router([]);
        this.router.path = path;
        try {
            let middleware = null
            if (api) {
                middleware = require(`${appRoot}/Middleware/Controller/API`)
                for (const middle in middleware) {
                    this.router.use(middleware[middle]);
                }
                middleware = null
                if(fs.existsSync(`${appRoot}/Middleware/Controller/API/${this.constructor.name.split('Controller')[0].charAt(0).toUpperCase()}${this.constructor.name.split('Controller')[0].slice(1)}Middleware.js`)) {
                    Logger.verbose("Including Middleware " + `${appRoot}/Middleware/Controller/API/${this.constructor.name.split('Controller')[0].charAt(0).toUpperCase()}${this.constructor.name.split('Controller')[0].slice(1)}Middleware.js`)
                    middleware = require(`${appRoot}/Middleware/Controller/API/${this.constructor.name.split('Controller')[0].charAt(0).toUpperCase()}${this.constructor.name.split('Controller')[0].slice(1)}Middleware.js`);
                }
            }
            else {
                middleware = require(`${appRoot}/Middleware/Controller`)
                for (const middle in middleware) {
                    this.router.use(middleware[middle]);
                }
                middleware = null
                if (fs.existsSync(`${appRoot}/Middleware/Controller/${this.constructor.name.split('Controller')[0].charAt(0).toUpperCase()}${this.constructor.name.split('Controller')[0].slice(1)}Middleware.js`)) {
                    Logger.verbose("Including Middleware " + `${appRoot}/Middleware/Controller/${this.constructor.name.split('Controller')[0].charAt(0).toUpperCase()}${this.constructor.name.split('Controller')[0].slice(1)}Middleware.js`)
                    middleware = require(`${appRoot}/Middleware/Controller/${this.constructor.name.split('Controller')[0].charAt(0).toUpperCase()}${this.constructor.name.split('Controller')[0].slice(1)}Middleware.js`);
                }
            }
            for (const middle in middleware) {
                this.router.use(middleware[middle]);
            }
            Logger.verbose("Controller: " + this.constructor.name.split('Controller')[0] + " created");
        }
        catch (e) {
            Logger.verbose("Controller: " + this.constructor.name.split('Controller')[0] + " created");
            Logger.error("Failed to load Controller " + this.constructor.name.split('Controller')[0] + " middleware: " + e.message)
        }

    }

}

module.exports = Controller;




