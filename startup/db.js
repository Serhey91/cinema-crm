const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {

    mongoose.connect('mongodb://localhost/Cinema-CRM', {
            useNewUrlParser: true
        })
        .then(() => {
            winston.info('Connected to MongoDB.....')
        })
}