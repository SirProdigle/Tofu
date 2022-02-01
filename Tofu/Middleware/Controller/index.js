//Middleware created here apply to ALL controllers (non-api)
const winston = require('winston');
const appRoot = require("app-root-path");
Logger = require(`${appRoot}/Engine/Logger`);

module.exports = {

	/*
	GlobalControllerMiddleware: (req, res, next)=>{
		Logger.verbose("Global Controller Middleware");
		next()
	}
	*/

};