module.exports = (lowerName, options) => {
    const fs = require('fs');
    lowerName = lowerName[0].toLowerCase() + lowerName.slice(1);
    const name = lowerName[0].toUpperCase() + lowerName.slice(1);
    const appRoot = require("../Helpers/FindRoot");
    const tofuRoot = require("app-root-path");
    const config = require(`${appRoot}/Config`);
    const viewEngine = config.express.viewEngine;
    const Logger =require(`${tofuRoot}/lib/Logger`)
    const utils = require("./utils")


    const renderLine = viewEngine === " " ? `res.send("${name}: No view engine is active");` :`res.render('${name}/index',{title: '${name} Page',msg: 'Page for ${name}'});`

    const body =
`const appRoot = require("app-root-path");
const Controller = require(\`\${appRoot}/Engine/Controller\`);
       
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

    const bodyApi =
`const appRoot = require("app-root-path");
const Controller = require(\`\${appRoot}/Engine/Controller\`);
const ${name} = require(\`\${appRoot}/Models/${name}Model\`)
       
    class ${name}Controller extends Controller {
        constructor() {
            super("${lowerName}",true);
            
            this.router.get('/', async (req, res) => {
                res.json(await ${name}.find())
            });
            
             this.router.get('/:id', async (req, res) => {
                res.json(await ${name}.findById(req.params.id))
            });
            
            this.router.post('/', async (req, res) => {
                const new${name} = new ${name}({name : req.body.name})
                const item = await new${name}.save()
                res.json(await ${name}.findById(item.id))
            });
            
            this.router.post('/:id', async (req, res) => {
                const result = await ${name}.update({_id: req.params.id},req.body)
                res.json(result)
            });
        
        }
    }
            
const Con = new ${name}Controller();
module.exports = Con.router; `;

    if (!options.api) {
        utils.WriteComponent(name, body, options, "Controller")
        if (!fs.existsSync(`${appRoot}/Resources/Views/${name}`))
            fs.promises.mkdir(`${appRoot}/Resources/Views/${name}`)
                .catch(e => Logger.error(`View Folder could not generate: ${e.message}`))
                .then(() => Logger.info(`${name} View Folder made`))
        else Logger.info(`View Folder ${name} already exists. Skipping stage`)

        if (viewEngine !== " ") {
            //TODO Only works if view engine == file extension
            if (!fs.existsSync(`${appRoot}/Resources/Views/${name}/index.${viewEngine}`) || options.force)
                fs.promises.copyFile(`${appRoot}/Resources/Views/Templates/default.${viewEngine}`, `${appRoot}/Resources/Views/${name}/index.${viewEngine}`)
                    .catch(e => Logger.error(`View template could not copy: ${e.message}`))
                    .then(() => Logger.info(`${name} View Template copied`))
            else Logger.info(`View Template for ${name} already exists. Skipping stage`)
        }
    }
    else {
        if(!fs.existsSync(`${appRoot}/Controllers/API/${name}Controller.js`) || options.force) {
            fs.promises.writeFile(`${appRoot}/Controllers/API/${name}Controller.js`, bodyApi)
                .catch(e => Logger.error(`API Controller could not generate : ${e.message}`))
                .then(() => Logger.info(`API/${name}Controller made`))
        } else Logger.info(`API Controller ${name} already exists. Skipping stage`)
    }


}