module.exports = (lowerName,types) => {
    const fs = require('fs');
    lowerName = lowerName[0].toLowerCase() + lowerName.slice(1);
    const name = lowerName[0].toUpperCase() + lowerName.slice(1);
    const appRoot = require("../Helpers/FindRoot")();
    const config = require(`${appRoot}Config`);
    const viewEngine = config.express.viewEngine;

    const body =
        `const appRoot = require("app-root-path");
        const Controller = require(\`${appRoot}/Engine/Controller\`);
       
        class ${name}Controller extends Controller {
            constructor() {
                super("${lowerName}");
            
                this.router.get('/', (req, res) => {
                    res.render('index')
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
}