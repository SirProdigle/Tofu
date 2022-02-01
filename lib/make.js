const fs = require("fs");
const colors = require("colors");
const GenController = require("./Generators/GenController");
const GenModel = require("./Generators/GenModel");
const GenMiddleware = require("./Generators/GenMiddleware");

module.exports = (args, options, logger) => {
    const selection = args['types'];
    const types = {
        Controller : (selection.includes("controller") || selection.includes("mvc")),
        Model : (selection.includes("model") || selection.includes("mvc")),
        Middleware : (selection.includes("middleware") ||  selection.includes("mvc")),
    };
    const name = args['name'];


    if(types.Controller)
        GenController(name,options);
    if(types.Model)
        GenModel(name,options);
    if(types.Middleware)
        GenMiddleware(name,options);

};