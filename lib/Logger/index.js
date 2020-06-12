var appRoot = require('app-root-path');
var winston = require('winston');
const colorizer = winston.format.colorize();

// define the custom settings for each transport (file, console)
var options = {
    console: {
        handleExceptions: true,
        level: "info",
        format: winston.format.combine(
            winston.format.timestamp({format: "HH:mm:ss"}),
            winston.format.simple(),
            winston.format.printf(msg =>
                colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.level}: ${msg.message}`)
            ),
        )
    },
};

// instantiate a new Winston Logger with the settings defined above
const logger = new winston.createLogger({
    transports: [
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};

module.exports = logger;