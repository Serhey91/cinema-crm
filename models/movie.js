const Joi = require('joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 200
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 200
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre'
    }
})

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(2).max(50).required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
        genre: Joi.string().required()
        }
    return Joi.validate(movie, schema)
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;
module.exports.movieSchema = movieSchema;

