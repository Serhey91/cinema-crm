const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());
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
app.get('/api/genres', (req,res) => {
    res.status(200).send(genres)
})
app.get('/api/genres/:id', (req, res) => {
    const result = genres.find(genre => genre.id === +req.params.id);
    if(result) return res.status(200).send(result)
    else return res.status(404).send('No genre found with such id');
})
app.post('/api/genres', (req, res) => {
    const {error} = validateParams(req.body);
    if(error) return res.status(404).send(error.details[0].message)
    const newGenre = {
        name: req.body.name,
        id: genres.length+1
    }
    genres.push(newGenre)
    return res.status(201).send(newGenre)
})
app.put('/api/genres/:id', (req, res) => {
    const result = genres.find(genre => genre.id === +req.params.id);
    if(!result) {
       return res.status(404).send('The genre was not found with such id');
    }    const {error} = validateParams(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    result.name = req.body.name;
    return res.status(201).send(result)
})
app.delete('/api/genres/:id', (req, res) => {
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

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})