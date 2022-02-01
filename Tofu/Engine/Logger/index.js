const appRoot = require('app-root-path');
const winston = require('winston');
const colorizer = winston.format.colorize()
//TODO define files for e.g just HTTP logs

// define the custom settings for each transport (file, console)
const options = {
    fileGeneral: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    fileError: {
        level: 'error',
        filename: `${appRoot}/logs/error.log`,
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
        new winston.transports.File(options.fileGeneral),
        new winston.transports.File(options.fileError),
        new winston.transports.File({
            level: 'http',
            filename: `${appRoot}/logs/http.log`,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(i => i.level === 'http' ? `${i.level.toUpperCase()}: ${i.timestamp} ${i.message}` : '')
            )
        }),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.http(message.substring(0,message.lastIndexOf('\n')));
    },
};

module.exports = logger;