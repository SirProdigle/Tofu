const fs = require("fs");
const colors = require("colors");
const GenController = require("./Generators/GenController");
const GenModel = require("./Generators/GenModel");
const GenMiddleware = require("./Generators/GenMiddleware");

module.exports = (args, options, logger) => {
    const selection = args['allControllerModelMiddleware'];
    const types = {
        Controller : (selection.includes("controller") || selection.includes("all")),
        Model : (selection.includes("model") || selection.includes("all")),
        Middleware : (selection.includes("middleware") ||  selection.includes("all")),
        CRUD : options['crud'],
    };
    const name = args['name'];

    if(types.Controller)
        GenController(name,types);
    if(types.Model)
        GenModel(name,types);
    if(types.Middleware)
        GenMiddleware(name,types);
};