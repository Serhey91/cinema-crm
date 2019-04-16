const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25
    }
})

const Genre = mongoose.model('Genre', genreSchema);
function validateParams(genre) {
const schema = {
    name: Joi.string().min(3).required()
}
return Joi.validate(genre, schema)
}



module.exports.Genre = Genre
module.exports.validateParams = validateParams;
module.exports.genreSchema = genreSchema;