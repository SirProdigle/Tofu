#!/usr/bin/env node

const prog = require('caporal');
const createCmd = require('./lib/create');
const enginesCmd = require('./lib/engines');
const update = require('./lib/update');
const makeCmd = require('./lib/make');
const CWD = require('./lib/Helpers/FindRoot')
const fs = require("fs");

prog
    .version('0.0.1')
    .command('create', 'Create a new application')
    .argument("<name>", "Name of the project being created")
    .option("--no-examples","Create Tofu project without examples") //Options are checked as options['noExamples']
    .argument("[viewEngine]", "View engine being used (Tofu engines)", false)
    .action(createCmd)
    .command("engines", "Show list of supported view engines")
    .action(enginesCmd)
    .command("update", "Update a project to the latest Tofu template version")
    .option("--dry-run", "Show changes an update would make")
    .action(()=>{console.error("Update feature not yet implemented".red)})
    .command("make", "Generate an MVC component",)
    .argument("<name>","Prefix for Controller/Middleware (e.g User => UserController)")
    .argument('[all|controller|model|middleware]...', "Type of unit to generate",/^controller|model|middleware|all$/,
        "all")
    .option("--crud","Create boilerplate CRUD functionality")
    .action(makeCmd)
    ;


prog.parse(process.argv);