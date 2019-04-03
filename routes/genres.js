const Joi = require('joi');
const express = require('express');
const router = express.Router();
const genres = [
    {
        id:1,
        name: "Horror"
    },
    {
        id: 2,
        name: "Comedy"
    },
    {
        id: 3,
        name: "Drama"
    }
]
//routes
router.get('/', (req,res) => {
    res.status(200).send(genres)
})
router.get('/:id', (req, res) => {
    const result = genres.find(genre => genre.id === +req.params.id);
    if(result) return res.status(200).send(result)
    else return res.status(404).send('No genre found with such id');
})
router.post('/', (req, res) => {
    const {error} = validateParams(req.body);
    if(error) return res.status(404).send(error.details[0].message)
    const newGenre = {
        name: req.body.name,
        id: genres.length+1
    }
    genres.push(newGenre)
    return res.status(201).send(newGenre)
})
router.put('/:id', (req, res) => {
    const result = genres.find(genre => genre.id === +req.params.id);
    if(!result) {
       return res.status(404).send('The genre was not found with such id');
    }    const {error} = validateParams(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    result.name = req.body.name;
    return res.status(201).send(result)
})
router.delete('/:id', (req, res) => {
    const result = genres.find(genre => genre.id === +req.params.id);
    if(!result) {
        return res.status(404).send('The genre was not found with such id');
     }
     genres.splice(genres.indexOf(result), 1);
     return res.status(200).send(result);
})
    function validateParams(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}
module.exports = router;