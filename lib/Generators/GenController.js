module.exports = (lowerName,types) => {
    const fs = require('fs');
    lowerName = lowerName[0].toLowerCase() + lowerName.slice(1);
    const name = lowerName[0].toUpperCase() + lowerName.slice(1);
    const appRoot = require("../Helpers/FindRoot");
    const tofuRoot = require("app-root-path");
    const config = require(`${appRoot}/Config`);
    const viewEngine = config.express.viewEngine;
    const Logger =require(`${tofuRoot}/lib/Logger`)


    const renderLine = viewEngine === " " ? `res.send("${name}: No view engine is active");` :`res.render('${name}/index',{title: '${name} Page',msg: 'Page for ${name}'});`

    const body =
`const appRoot = require("app-root-path");
const Controller = require(\`${appRoot}/Engine/Controller\`);
       
    class ${name}Controller extends Controller {
        constructor() {
            super("${lowerName}");
            
            this.router.get('/', (req, res) => {
                ${renderLine}
            });
        
        }
    }
            
const Con = new ${name}Controller();
module.exports = Con.router; `;

    if(fs.existsSync(`${appRoot}/Controllers/${name}Controller.js`)) {
        fs.promises.writeFile(`${appRoot}/Controllers/${name}Controller.js`, body)
            .catch(e =>
            {if (err)
                Logger.error(`Controller could not generate : ${err.message}`);
            }).then(() =>
            {
                Logger.info(`${name}Controller made`);
            })
    }


     try {fs.mkdirSync(`${appRoot}/Resources/Views/${name}`);}
     catch (e) {
        Logger.warn(`Failed to make folder 'Resources/Views/${name}': ${e.message}`)
     }
    if(viewEngine !== " ") {
        //TODO Only works if view engine == file extension
        try {fs.copyFileSync(`${appRoot}/Resources/Views/Templates/default.${viewEngine}`, `${appRoot}/Resources/Views/${name}/index.${viewEngine}`);}
        catch (e) {
            Logger.warn("Failed to create template view file for Controller: " + e.message)
        }
    }
}