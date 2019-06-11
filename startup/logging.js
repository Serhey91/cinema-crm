const winston = require('winston');
const process = require('process');
require('express-async-errors')
require('winston-mongodb');

module.exports = function () {
    winston.exceptions.handle(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({filename: 'exceptions.log'}))

    process.on('unhandledRejection', (ex) => {
        throw ex
    })


    winston.add(new winston.transports.File({
        filename: 'logfile.log'
    }))
    winston.add(new winston.transports.MongoDB({
        db: 'mongodb://localhost/Cinema-CRM'
    }))
}