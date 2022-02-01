const fs = require("fs");
const appRoot = require("app-root-path");
const config = require("../../Config");
const express = require("express");
const http = require("http");
const helmet = require("helmet");
const winston = require('winston');
const morgan = require("morgan");
const Logger = require(appRoot + "/Engine/Logger");
const hound = require("hound")
const gulp = require(appRoot + "/gulpfile.js")
const fileUpload = require("express-fileupload")
module.exports = {

    DatabaseStartup: async (app) => {
        Logger.verbose("Database Startup Begin");
        if (!config.db.enabled) {
            Logger.warn("Database Disabled, Continuing");
            return;
        }
        const mongoose = require('mongoose');
        const promise = mongoose.connect(config.db.host, { useNewUrlParser: true }).catch((e) => {
            Logger.error(e.message)
            if (process.env.NODE_ENV === "production") {
                Logger.error("Failed to connect to mongoDB host: " + config.db.host + "\nClosing Down Node Server");
                process.exit();
            } else {
                Logger.error("Failed to connect to mongoDB host: " + config.db.host + "\nContinuing due to development environment");
            }
        }).then(() => Logger.verbose("Database Setup Complete"))
        return promise
    },

    SetExpressVariables: (app) => {
        Logger.verbose("Express Setup Begin");
        app.use(express.json())
        app.use(fileUpload({"useTempFiles" : true}))
        app.use(express.urlencoded({extended: true}))
        app.set('views', config.express.viewDir); //Set view path, eg rendering users/index renders path/users/index
        if (config.express.viewEngine === "hbs") {
            const hbs = require('express-hbs');
            // Use `.hbs` for extensions and find partials in `views/partials`.
            app.engine('hbs', hbs.express4({
                partialsDir: config.express.viewDir + '/Partials',
                layoutsDir: config.express.viewDir + "/Templates", defaultLayout: config.express.viewDir + "/Templates/default"
            }));
            app.set('view engine', 'hbs');
        }
        else {
            app.set('view engine', config.express.viewEngine); //Set view engine to create dynamic html
        }
        app.use(morgan('short', { stream: Logger.stream }));
        app.use(express.static(config.express.publicFolder)); //Set our Public folder for img/js/css
        app.use(helmet()); //Helmet sets up a lot of security variables
        Logger.verbose("Express Setup Complete");
    },

    AllowInlineScriptsInDev: (app) => {
        if(config.general.development_mode) {
            Logger.verbose("Allowing inline scripts")
            app.use(function(req, res, next) {
                res.header('Content-Security-Policy',"'unsafe-inline'")
                next();
            });
        }
    },

    LinkControllers: (app) => {
        Logger.verbose("Controller Linking Begin");
        fs.readdirSync(appRoot + "/Controllers").forEach(function (file) {
            if (file.substr(-3) === '.js') {
                let router = require(appRoot + '/Controllers/' + file);
                app.use("/" + router.path, router);
            }
        });
        if (config.express.api !== "only") {
            fs.readdirSync(appRoot + "/Controllers").forEach(function (file) {
                if (file.substr(-3) === '.js') {
                    let router = require(appRoot + '/Controllers/' + file);
                    app.use("/" + router.path, router);
                }
            });
        }
        if (config.express.api === "only" || config.express.api === "yes"){
            fs.readdirSync(appRoot + "/Controllers/API").forEach(function (file) {
                if (file.substr(-3) === '.js') {
                    let router = require(appRoot + '/Controllers/API/' + file);
                    let path = config.express.api === "only" ? "/" : "/api/";
                    path += router.path
                    path = path.replace("//","/")
                    app.use(path, router);
                }
            });
        }
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

    LiveCompileAssets : (app) => {
        if (config.general.development_mode) {
            Logger.verbose("Starting live reload of css/sass/js/image assets")

            sass = hound.watch(`${appRoot}/Resources/SASS`,null)
            css = hound.watch(`${appRoot}/Resources/CSS`,null)
            images = hound.watch(`${appRoot}/Resources/Images`,null)
            js = hound.watch(`${appRoot}/Resources/JS`,null)

            sass.on('change', (dir) => {
                Logger.verbose("Reloading Asset")
                gulp.series(gulp.task('sass'))()
            })
            sass.on('create', (dir) => {
                Logger.verbose("Reloading Asset")
                gulp.series(gulp.task('sass'))()
            })

            css.on('change', (dir) => {
                Logger.verbose("Reloading Asset")
                gulp.series(gulp.task('sass'))()
            })
            css.on('create', (dir) => {
                Logger.verbose("Reloading Asset")
                gulp.series(gulp.task('sass'))()
            })

            images.on('change', (dir) => {
                Logger.verbose("Reloading Asset")
                gulp.series(gulp.task('images'))()
            })
            images.on('create', (dir) => {
                Logger.verbose("Reloading Asset")
                gulp.series(gulp.task('images'))()
            })

            js.on('change', (dir) => {
                Logger.verbose("Reloading Asset")
                gulp.series(gulp.task('js'))()
            })
            js.on('create', (dir) => {
                Logger.verbose("Reloading Asset")
                gulp.series(gulp.task('js'))()
            })



        }
    },

    StartWebServer: (app) => {
        Logger.verbose("Starting Web Server");
        http.createServer(app).listen(config.express.port,"localhost", function () {
            Logger.verbose('Web Server launched on port ' + config.express.port);
            if (process.send) {
                process.send('online');
            }
        });

    }


};