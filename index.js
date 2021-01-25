#!/usr/bin/env node

const prog = require('caporal');
const createCmd = require('./lib/create');
const enginesCmd = require('./lib/engines');
const update = require('./lib/update');
const makeCmd = require('./lib/make');
const setCmd = require("./lib/set");
const fs = require("fs");
const logger = require("./lib/Logger");

prog
    .version('0.0.1')
    .logger(logger)
    .command('create', 'Create a new application')
    .argument("<name>", "Name of the project being created")
    .option("--no-examples","Create Tofu project without examples") //Options are checked as options['noExamples']
    .argument("[viewEngine]", "View engine being used (tofu show engines for full list)", false)
    .action(createCmd)
    .command("show engines", "Show list of supported view engines")
    .action(enginesCmd)
    .command("upgrade", "Update a project to the latest Tofu template version")
    .option("--dry-run", "Show changes an update would make")
    .action(()=>{console.error("Update feature not yet implemented".red)})
    .command("make", "Generate an MVC component",)
    .argument("<name>","Prefix for Controller/Middleware (e.g User => UserController)")
    .argument('[types]...', "Types of units to generate:\n" +"mvc".magenta.bold + " | controller | model | middleware | event | timer | service".magenta,["","mvc","controller","model","middleware","event","timer","service"],
        "mvc")
    .option("--crud","Create boilerplate CRUD functionality")
	.option("--force", "force generation of file even if a file already exists")
    .action(makeCmd)
    .command("set", "Set a Tofu setting for the current project")
    .argument("<option>", "Use tofu show options for a full list")
    .argument("<value>", "Value to set")
    .action(setCmd);


prog.parse(process.argv);