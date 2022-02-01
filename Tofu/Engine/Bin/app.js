const appRoot = require("app-root-path");
require('dotenv').config(`${appRoot}/.env`); // Needed to read env file
const config = require(`${appRoot}/Config`); //include our Config file as Config
const express = require('express'),
    http = require('http'), //http for server
    fs = require('fs'), //file system for dynamically reading Controllers
    app = express(),
    morgan = require("morgan"),
    winston = require("winston"),
    Logger = require(appRoot + "/Engine/Logger");
    startup = require(appRoot + "/Engine/Startup");
    customStartup = require(appRoot + "/Middleware/Startup");


//Run through all the startup functions defined in Startup/System/Startup.js, they can only take in app as a param for this
Start()

async function Start(){
    Logger.info("Running Core Startup");
    let toAwait = []
    for (const startupProcess in startup) {
        const returned =startup[startupProcess](app);
        if (typeof returned?.then === "function") //Check for a promise
            toAwait.push(returned)
    }
    Logger.info("Waiting for core startup to finish...")
    await Promise.all(toAwait)

    Logger.info('Core Startup Finished');
    Logger.info("Running Custom Startup")
    for (const startupProcess in customStartup) {
        Logger.verbose('Custom Startup: ' + customStartup[startupProcess].name);
        customStartup[startupProcess](app);
    }
}