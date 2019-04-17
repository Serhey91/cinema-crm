const express = require('express');
const router = express.Router();
const {User, userSchema, validateUser} = require('../models/user')
const mongoose = require('mongoose');


router.post('/', async (req, res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    
    const userWithSuchEmail = await User.findOne({email: req.body.email})
    if (userWithSuchEmail) return res.status(400).send('User already registered!');
    
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    await user.save();
    return res.status(201).send(user)
})

module.exports = router;