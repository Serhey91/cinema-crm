const mongoose = require('mongoose');
const Joi = require('joi');

const rentalSchema = {
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}
const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = {
        customer: Joi.string().required(),
        movie: Joi.string().required()
        }
    return Joi.validate(rental, schema)
}

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;
module.exports.rentalSchema = rentalSchema;
