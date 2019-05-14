const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { User, userSchema } = require('../models/user')
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
    const {
        error
    } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) return res.status(400).send('Invalid email or password');
    
    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) return res.status(400).send('Invalid email or password');
    const token = user.generateAuthToken();
    res.send(token)
})

function validateAuth(req) {
    const schema = {
        password: Joi.string().required().min(5).max(100),
        email: Joi.string().required().min(5).max(50).email()
    }
    return Joi.validate(req, schema)
}


module.exports = router;