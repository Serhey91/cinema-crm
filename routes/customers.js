const express = require('express');
const router = express.Router();
const {Customer, validateParams, customerSchema} = require('../models/customer');
const auth = require('../middleware/auth')

router.get('/', async (req,res) => {
    const customers = await Customer.find().sort('name');
    if(customers) return res.status(200).send(customers)
})
router.get('/:id', async (req, res) => {
    const result = await Customer.findById(req.params.id);
    if(result) return res.status(200).send(result)
    else return res.status(404).send('No customer found with such id');
})
router.post('/', auth, async (req, res) => {
    const {error} = validateParams(req.body);
    if(error) return res.status(404).send(error.details[0].message)
    const newCustomer =  new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        })
    const result = await newCustomer.save();
    if(result) return res.status(201).send(newCustomer)
})
router.put('/:id', auth, async (req, res) => {
    try
    {   
        const {error} = validateParams(req.body);
        if(error) return res.status(404).send(error.details[0].message);
        const result = await Customer.findById(req.params.id);
        if(!result) {
            return res.status(404).send('The customer was not found with such id');
        }        
        result.set({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        });
        const updatedCustomer = await result.save();
        return res.status(201).send(updatedCustomer)
    }
    catch(err) {
        return res.status(404).send(err.message);
    }
})
router.delete('/:id', auth, async (req, res) => {
    const result = await Customer.findByIdAndRemove(req.params.id);
    if(!result) {
        return res.status(404).send('The customer was not found with such id');
     }
     return res.status(200).send(result);
})

module.exports = router;