const express = require('express');
const Property = require('../models/property');
const router = express.Router();

// Create a property
router.post('/', async (req, res) => {
    const { title, price, description, location } = req.body;
    try {
        const newProperty = new Property({ title, price, description, location });
        const savedProperty = await newProperty.save();
        res.json(savedProperty);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get all properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update a property
router.put('/:id', async (req, res) => {
    const { title, price, description, location } = req.body;
    try {
        const property = await Property.findByIdAndUpdate(
            req.params.id,
            { title, price, description, location },
            { new: true }
        );
        res.json(property);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete a property
router.delete('/:id', async (req, res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Property removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;