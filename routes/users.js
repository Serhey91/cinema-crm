const express = require('express');
const router = express.Router();
const {User, userSchema, validateUser} = require('../models/user')
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth')

router.post('/', async (req, res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    
    const userWithSuchEmail = await User.findOne({email: req.body.email})
    if (userWithSuchEmail) return res.status(400).send('User already registered!');
    
    let user = new User(_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    
    const token = user.generateAuthToken();

    return res.status(201)
        .header('x-auth-token', token)
        .send(_.pick(user, ['_id', 'name', 'email']))
})

// router.get('/', async (req,res) => {
//     let users = await User.find();
//     if(users)  
//     users = users.map(user => _.pick(user, ['_id', "name", 'email']))
//     return res.status(200).send(users)
// })

router.get('/user', auth, async (req,res) => {
    const user = await User.findById(req.user._id).select('-password');
    return res.status(200).send(user);
})

module.exports = router;