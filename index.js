require('./startup/db')();
require('./startup/logging')();
require('./startup/config')()
require('./startup/validation')()

const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/routes')(app)

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
    winston.info('listening on port ' + PORT);
})