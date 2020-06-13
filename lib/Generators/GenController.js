module.exports = (lowerName,types) => {
    const fs = require('fs');
    lowerName = lowerName[0].toLowerCase() + lowerName.slice(1);
    const name = lowerName[0].toUpperCase() + lowerName.slice(1);
    const appRoot = require("../Helpers/FindRoot");
    const tofuRoot = require("app-root-path");
    const config = require(`${appRoot}/Config`);
    const viewEngine = config.express.viewEngine;


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

    fs.writeFile(`${appRoot}/Controllers/${name}Controller.js`,body, (err => {
        if(err)
            console.error(err);
        console.log(`${name}Controller made`);
    }))


    fs.mkdir(`${appRoot}/Resources/Views/${name}`,() => {return});
    if(!viewEngine === " ") {
        //Only works if view engine == file extension
        fs.copyFileSync(`${appRoot}/Resources/Views/Templates/default.${viewEngine}`, `${appRoot}/Resources/Views/${name}/index.${viewEngine}`);
    }
}