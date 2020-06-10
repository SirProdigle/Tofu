module.exports = (lowerName,types) => {
    const fs = require('fs');
    lowerName = lowerName[0].toLowerCase() + lowerName.slice(1);
    const name = lowerName[0].toUpperCase() + lowerName.slice(1);
    const appRoot = require("../Helpers/FindRoot")();

    const body =
        `const mongoose = require('mongoose')
            ,Schema = mongoose.Schema;
            ${name}Schema = new Schema({
                name: String,
                description: String
            });
        ${name} = mongoose.model("${name}",${name}Schema);
        module.exports = ${name};        
        `;

    fs.writeFile(`${appRoot}/Models/${name}.js`,body, (err => {
        if(err)
            console.error(err);
        console.log(`${name} made`);
    }))
}