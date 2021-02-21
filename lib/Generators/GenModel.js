module.exports = (lowerName,options) => {
    const fs = require('fs');
    lowerName = lowerName[0].toLowerCase() + lowerName.slice(1);
    const name = lowerName[0].toUpperCase() + lowerName.slice(1);
    const appRoot = require("../Helpers/FindRoot");
    const tofuRoot = require("app-root-path");
    const logger = require(`${tofuRoot}/lib/Logger`)
    const utils = require("./utils")

    const body =
`const mongoose = require('mongoose'),Schema = mongoose.Schema;

${name}Schema = new Schema({
    name: String,
    description: String
});

${name} = mongoose.model("${name}",${name}Schema);
module.exports = ${name};        
`;

    utils.WriteComponent(name,body,options,"Model")
}