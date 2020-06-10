const winston = require('winston');
const appRoot = require("app-root-path");
Logger = require(`${appRoot}/Engine/Logger`);

//Custom middleware runs at the final step as express is just created and ran, but before any controller linking etc. This would be a good location for creating other needed server's such as additional databases, RabbitMQ, etc.
module.exports = {

    /*
    CustomStartup: ()=>{
        Logger.verbose("Custom Startup Function 'CustomStartup'");
    }
    */

};