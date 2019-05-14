const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
const mongoose = require('mongoose');
const { Movie } = require('../models/movie')
const { Customer } = require('../models/customer')
const { Rental, validateRental } = require('../models/rental');
const auth = require('../middleware/auth')

Fawn.init(mongoose);

router.get('/',  (req, res) => {
    //like in old version
    Rental.find()
    .populate('customer', 'name phone -_id')
    .populate('movie', 'title -_id')
        .sort({ dateOut: -1 })
        .then(rentals => res.status(200).send(rentals))
})

router.get('/:id',  (req,res) => {
    Rental.findById(req.params.id)
    .populate('customer', 'name phone isGold')
    .populate('movie', 'title')
        .then(rental => res.status(200).send(rental))
        .catch(err => { res.status(404).send(err.message) })
})

router.post('/', auth, async (req,res) => {
        const {error} = validateRental(req.body);
        if(error) return res.status(404).send(error.details[0].message);
        const customer = await Customer.findById(req.body.customer);
        if(!customer) return res.status(404).send('There is no customer with such id');
        const movie = await Movie.findById(req.body.movie);
        if(!movie) return res.status(404).send('There is no movie with such id');
        if(movie.numberInStock === 0) return res.status(400).send('There is no free tickets')
        const newRental =  new Rental(
            {
                customer: req.body.customer,
                movie: req.body.movie
            }
        )
        try {
            new Fawn.Task()
                .save("rentals", newRental)
                .update('movies', 
                    {_id: movie._id}, 
                    {$inc: {
                        numberInStock: -1
                    }
                })
                .run();
            return res.status(201).send(newRental);
        } catch(e){
            res.status(500).send('Something failed.')
        }   
})

module.exports = router;