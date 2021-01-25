module.exports = (lowerName,options) => {
    const fs = require('fs');
    lowerName = lowerName[0].toLowerCase() + lowerName.slice(1);
    const name = lowerName[0].toUpperCase() + lowerName.slice(1);
    const appRoot = require("../Helpers/FindRoot");
    const tofuRoot = require("app-root-path");
    const Logger = require(`${tofuRoot}/lib/Logger`)
    const utils = require("./utils")
        
const body = `module.exports = {
        
    /*
    ()=>{
        Logger.verbose("${name}Middleware");
    }
    */
        
}`;

    utils.WriteComponent(name,body,options,"Middleware","Middleware")

    // if (fs.existsSync(`${appRoot}/Middleware/Controller/${name}Middleware.js`) || options.force)
    //     fs.promises.writeFile(`${appRoot}/Middleware/Controller/${name}Middleware.js`,body)
    //         .catch(e => Logger.error("Middleware could not generate: " + e.message))
    //         .then(Logger.info(`Middleware ${name} made`))
    // else Logger.info(`Middleware ${name} already exists. Skipping stage`)
}