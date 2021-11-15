#!/usr/bin/env node

const prog = require('caporal');
const createCmd = require('./lib/create');
const enginesCmd = require('./lib/engines');
const update = require('./lib/update');
const makeCmd = require('./lib/make');
const setCmd = require("./lib/set");
const fs = require("fs");
const logger = require("./lib/Logger");
const {spawn} = require("child_process");

prog
    .version('0.0.1')
    .logger(logger)
    .command('create', 'Create a new application')
    .argument("<name>", "Name of the project being created")
    .option("--no-examples","Create Tofu project without examples") //Options are checked as options['noExamples']
    .argument("[viewEngine]", "View engine being used\n" + "hbs".magenta.bold + " | pug | ejs | none".magenta, null,"hbs")
	.argument("[manager]","Install alongside a production hypervisor\n" + "pm2".magenta.bold + " | nodemon | none".magenta,null,"pm2")
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
	.option("--api","Make an API Middleware/Controller")
    .action(makeCmd)
    .command("set", "Set a Tofu setting for the current project")
    .argument("<option>", "Use tofu show options for a full list")
    .argument("<value>", "Value to set")
    .action(setCmd)
	.command('develop', "Run in development mode with browser/asset hot-reload")
	.action(() => {
		const command = spawn("npm", ["run", "dev"],{
			env: {
				NODE_ENV: "development",
				PATH: process.env.PATH}
		});
		command.stdout.pipe(process.stdout)
	})
	.command('start', "A wrapper around npm start")
	.action(() => {
		const command = spawn("npm", ["start"]);
		command.stdout.pipe(process.stdout)
	});


prog.parse(process.argv);