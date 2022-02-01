const appRoot = require("../Helpers/FindRoot");
const tofuRoot = require("app-root-path");
const Logger = require(`${tofuRoot}/lib/Logger`)
const fs = require("fs")
module.exports = {

	WriteComponent: function (name, body, options, item, itemPlural = null) {
		itemPlural = itemPlural != null ? itemPlural : item + "s"
		if(!fs.existsSync(`${appRoot}/${itemPlural}/${name}${item}.js`) || options.force) {
			fs.promises.writeFile(`${appRoot}/${itemPlural}/${name}${item}.js`, body)
				.catch(e => Logger.error(`${item} could not generate : ${e.message}`))
				.then(() => Logger.info(`${name}${item} made`))
		} else Logger.info(`${item} ${name} already exists. Skipping stage`)
	}

}