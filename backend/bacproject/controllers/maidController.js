const Maid = require('../models/Maid');

// Create a new maid listing
exports.createMaid = async (req, res) => {
    try {
        const maid = new Maid(req.body);
        await maid.save();
        res.status(201).json(maid);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all maid listings
exports.getMaids = async (req, res) => {
    try {
        const maids = await Maid.find();
        res.json(maids);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a single maid listing by ID
exports.getMaidById = async (req, res) => {
    try {
        const maid = await Maid.findById(req.params.id);
        if (!maid) return res.status(404).json({ message: 'Maid not found' });
        res.json(maid);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a maid listing
exports.updateMaid = async (req, res) => {
    try {
        const maid = await Maid.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!maid) return res.status(404).json({ message: 'Maid not found' });
        res.json(maid);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a maid listing
exports.deleteMaid = async (req, res) => {
    try {
        const maid = await Maid.findByIdAndDelete(req.params.id);
        if (!maid) return res.status(404).json({ message: 'Maid not found' });
        res.json({ message: 'Maid deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};