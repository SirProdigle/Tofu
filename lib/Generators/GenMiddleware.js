module.exports = (lowerName,types) => {
    const fs = require('fs');
    lowerName = lowerName[0].toLowerCase() + lowerName.slice(1);
    const name = lowerName[0].toUpperCase() + lowerName.slice(1);
    const appRoot = require("../Helpers/FindRoot")();

    const body =
        `const appRoot = require("app-root-path");
        const Logger = require(\`${appRoot}/Engine/Logger\`);
        
        module.exports = {
        
            /*
            ()=>{
                Logger.verbose("${name}Middleware");
            }
            */
        
        };
        `;

    console.log("writing");
    fs.writeFileSync(`${appRoot}Middleware/Controller/${name}Middleware.js`,body, (err => {
        if(err)
            console.error(err);
        console.log(`${name}Middleware made`);
    }))
}