//Middleware created here apply to ALL API controllers
const winston = require('winston');
const appRoot = require("app-root-path");
Logger = require(`${appRoot}/Engine/Logger`);

module.exports = {

	/*
	GlobalAPIMiddleware: (req,res,next)=>{
		Logger.verbose("Global API Middleware");
		next()
	}
	*/

};