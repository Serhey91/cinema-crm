const mongoose = require('mongoose');
const Joi = require('joi');
const userSchema = {
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    }
}
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().min(5).max(50).email(),
        password: Joi.string().required().min(5).max(100)
        }
    return Joi.validate(user, schema)
}

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.userSchema = userSchema;
