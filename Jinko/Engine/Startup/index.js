const fs = require("fs");
const approot = require("app-root-path");
const config = require("../../Config");
const express = require("express");
const http = require("http");
const helmet = require("helmet");
const winston = require('winston');
const morgan = require("morgan");
const Logger = require(approot + "/Engine/Logger");
module.exports = {
    
    DatabaseStartup: (app) => {
        Logger.verbose("Database Startup Begin");
        if(!config.db.enabled) {
            Logger.info("Database Disabled, Database Setup Complete");
            return;
        }
        const mongoose = require('mongoose');
        mongoose.connect(config.db.host).catch(function () {
            if (process.env.NODE_ENV === "production") {
                Logger.error("Failed to connect to mongoDB host: " + config.db.host + "\nClosing Down Node Server");
                process.exit();
            }
            else {
                Logger.error("Failed to connect to mongoDB host: " + config.db.host + "\nContinuing due to development environment");
            }
            Logger.verbose("Database Setup Complete");
        });
    },

    SetExpressVariables: (app) => {
        Logger.verbose("Express Setup Begin");
        app.set('views', config.express.directory); //Set view path, eg rendering users/index renders path/users/index
        if (config.express.viewEngine === "express-hbs") {
            const hbs = require('express-hbs');
            // Use `.hbs` for extensions and find partials in `views/partials`.
            app.engine('hbs', hbs.express4({
                partialsDir: config.views.directory + '/Partials'
            }));
            app.set('view engine', 'hbs');
        }
        else {
            app.set('view engine', config.express.viewEngine); //Set view engine to create dynamic html
        }
        app.use(morgan('combined', { stream: Logger.stream }));
        app.use(express.static(config.express.publicFolder)); //Set our Public folder for img/js/css
        app.use(helmet()); //Helmet sets up a lot of security variables
        Logger.verbose("Express Setup Complete");
    },

    //NOTE: because of the use of process.cwd, the app.js must be called from inside the base folder when using the node or npm start command
    LinkControllers: (app) => {
        Logger.verbose("Controller Linking Begin");
        fs.readdirSync(process.cwd() + "/Controllers").forEach(function (file) {
            if (file.substr(-3) === '.js') {
                let router = require(approot + '/Controllers/' + file);
                app.use("/" + router.path, router);
            }
        });
        Logger.verbose("Controller Linking End");
    },

    /* TODO redo timers
    SetupTimers: (app) => {
        Logger.verbose("Timer Linking Begin");
        fs.readdirSync(process.cwd() + "/Timers").forEach(function (file) {
            if (file.substr(-3) === '.js') {
                let timer = require(process.cwd() + '/Timers/' + file);
                setInterval(timer.timerFunc, timer.time);
            }
        });
        Logger.verbose("Timer Linking End");
    },
    */

    ForceHTTPS: (app) => {
        Logger.verbose("Force HTTPS Begin");
        if(config.express.forceHTTPS) {
            app.enable('trust proxy');
            app.use(function (req, res, next) {
                if (req.secure) {
                    // request was via https, so do no special handling
                    next();
                } else {
                    // request was via http, so redirect to https
                    res.redirect('https://' + req.headers.host + req.url);
                }
            });
        }
        Logger.verbose("Force HTTPS End");

    },

    StartWebServer: (app) => {
        Logger.verbose("Starting Web Server");
        http.createServer(app).listen(config.express.port,"localhost", function () {
            Logger.verbose('Web Server launched on port ' + config.express.port);
        });

    }


};