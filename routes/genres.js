const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Genre, validateParams, genreSchema} = require('../models/genre');
const auth = require('../middleware/auth');

router.get('/', async (req,res) => {
    const genres = await Genre.find().sort('name');
    if(genres) return res.status(200).send(genres)
})
router.get('/:id', async (req, res) => {
    const result = await Genre.findById(req.params.id);
    if(result) return res.status(200).send(result)
    else return res.status(404).send('No genre found with such id');
})
router.post('/', auth, async (req, res) => {
    const {error} = validateParams(req.body);
    if(error) return res.status(404).send(error.details[0].message)
    const newGenre =  new Genre({name: req.body.name})
    const result = await newGenre.save();
    if(result) return res.status(201).send(newGenre)
})
router.put('/:id', auth, async (req, res) => {
    try
    {   
        const {error} = validateParams(req.body);
        if(error) return res.status(404).send(error.details[0].message);
        const result = await Genre.findById(req.params.id);
        if(!result) {
            return res.status(404).send('The genre was not found with such id');
        }        
        result.set({
            name: req.body.name
        });
        const updatedGenre = await result.save();
        return res.status(201).send(updatedGenre)
    }
    catch(err) {
        return res.status(404).send(err.message);
    }
})
router.delete('/:id', auth, async (req, res) => {
    const result = await Genre.findByIdAndRemove(req.params.id);
    if(!result) {
        return res.status(404).send('The genre was not found with such id');
     }
     return res.status(200).send(result);
})

module.exports = router;