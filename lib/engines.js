const fs = require("fs");
const colors = require("colors");

module.exports = (args, options, logger) => {
const engineJson = JSON.parse(fs.readFileSync(__dirname + "/../data/engines/engines.json"));
engineJson.map((obj)=>{
    logger.info(""+obj.name[0].yellow + " ");
});


};