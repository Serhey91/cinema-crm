const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const mongoose = require('mongoose');
app.use(express.json());

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

mongoose.connect('mongodb://localhost/Cinema-CRM', {useNewUrlParser: true})
.then(() => {
    console.log('Connected to MongoDB.....')
})
.catch((err) => console.error(err))
const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})