const appRoot = require('app-root-path');
const winston = require('winston');
const colorizer = winston.format.colorize()
//TODO define files for e.g just HTTP logs

// define the custom settings for each transport (file, console)
const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
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
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.http(message);
    },
};

module.exports = logger;