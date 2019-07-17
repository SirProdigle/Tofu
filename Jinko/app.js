//TODO capture -v here to enable logging mode for logger

const approot = require("app-root-path");
require('dotenv').config(`${approot}/.env`); // Needed to read env file
const config = require('./Config'); //include our Config file as Config
const express = require('express'),
    http = require('http'), //http for server
    fs = require('fs'), //file system for dynamically reading Controllers
    app = express(),
    morgan = require("morgan"),
    winston = require("winston"),
    Logger = require(approot + "/Engine/Logger");
    startup = require(approot + "/Engine/Startup");
    customStartup = require(approot + "/Middleware/Startup");


//Run through all the startup functions defined in Startup/System/Startup.js, they can only take in app as a param for this

for (const startupProcess in startup){
    startup[startupProcess](app);
}

Logger.info('Running Custom Startup');
for (const startupProcess in customStartup){
   Logger.verbose('Custom Startup: ' + customStartup[startupProcess].name);
    customStartup[startupProcess](app);
}
Logger.info("Startup Complete");
