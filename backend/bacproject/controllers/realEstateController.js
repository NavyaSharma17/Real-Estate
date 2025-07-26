const RealEstate = require('../models/RealEstate');

// Create a new real estate listing
exports.createRealEstate = async (req, res) => {
    try {
        const realEstate = new RealEstate(req.body);
        await realEstate.save();
        res.status(201).json(realEstate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all real estate listings
exports.getRealEstates = async (req, res) => {
    try {
        const realEstates = await RealEstate.find();
        res.json(realEstates);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a single real estate listing by ID
exports.getRealEstateById = async (req, res) => {
    try {
        const realEstate = await RealEstate.findById(req.params.id);
        if (!realEstate) return res.status(404).json({ message: 'Real estate not found' });
        res.json(realEstate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a real estate listing
exports.updateRealEstate = async (req, res) => {
    try {
        const realEstate = await RealEstate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!realEstate) return res.status(404).json({ message: 'Real estate not found' });
        res.json(realEstate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a real estate listing
exports.deleteRealEstate = async (req, res) => {
    try {
        const realEstate = await RealEstate.findByIdAndDelete(req.params.id);
        if (!realEstate) return res.status(404).json({ message: 'Real estate not found' });
        res.json({ message: 'Real estate deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};