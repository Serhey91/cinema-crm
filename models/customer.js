const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /^\+[1-9]{1}[0-9]{3,14}$/.test(v);
            },
            message: 'Invalid phone number'
        },
        required: true
    }
})

const Customer = mongoose.model('Customer', customerSchema);

function validateParams(customer) {
    const schema = {
        name: Joi.string().min(2).max(20).required(),
        phone: Joi.string().required().regex(/^\+[1-9]{1}[0-9]{3,14}$/),
        isGold: Joi.boolean()
    }
    return Joi.validate(customer, schema);
}



module.exports.Customer = Customer
module.exports.validateParams = validateParams;
module.exports.customerSchema = customerSchema;