const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
    User
} = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
router.post('/', async (req, res) => {
    const {
        error
    } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userWithSuchEmail = await User.findOne({
        email: req.body.email
    })
    if (!userWithSuchEmail) return res.status(400).send('Invalid email or password');

    const result = await bcrypt.compare(req.body.password, userWithSuchEmail.password);
    if (!result) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({_id: userWithSuchEmail._id}, config.get("jwtPrivateKey"));
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