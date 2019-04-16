const express = require('express');
const router = express.Router();
const {Movie, movieSchema, validateMovie} = require('../models/movie');
const {Genre} = require('../models/genre');
router.get('/', async (req,res) => {
    const movies = await Movie.find().sort('title').populate('genre', 'name -_id');
    if(movies) return res.status(200).send(movies)
})
router.get('/:id', async (req, res) => {
    const result = await Movie.findById(req.params.id).populate('genre', 'name');
    if(result) return res.status(200).send(result)
    else return res.status(404).send('No movie found with such id');
})
router.post('/', async (req, res) => {
    try {
        const {error} = validateMovie(req.body);
        if(error) return res.status(404).send(error.details[0].message);
        const genre = await Genre.findById(req.body.genre);
        if(!genre) return res.status(404).send('There is no genre with such id');
        
        const newMovie =  new Movie(
            {
                title: req.body.title,
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate,
                genre: req.body.genre
            }
        )
        const result = await newMovie.save();
        if(result) return res.status(201).send(newMovie);
        } 
        catch(e) {
            return res.status(404).send(e.message);
        }
})
router.put('/:id', async (req, res) => {
    try
    {   
        const {error} = validateMovie(req.body);
        if(error) return res.status(404).send(error.details[0].message);
        const result = await Movie.findById(req.params.id);
        if(!result) {
            return res.status(404).send('The movie was not found with such id');
        } 
        const genre = await Genre.findById(req.body.genre);
        if(!genre) return res.status(400).send('There is no genre with such id');

        result.set({
            title: req.body.title,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
            genre: req.body.genre
        });

        const updatedMovie = await result.save();
        return res.status(201).send(updatedMovie)
    }
    catch(err) {
        return res.status(404).send(err.message);
    }
})
router.delete('/:id', async (req, res) => {
    const result = await Movie.findByIdAndRemove(req.params.id);
    if(!result) {
        return res.status(404).send('The movie was not found with such id');
     }
     return res.status(200).send(result);
})

module.exports = router;