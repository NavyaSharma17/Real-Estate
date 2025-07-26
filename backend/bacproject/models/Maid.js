const mongoose = require('mongoose');

const MaidSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    experience: { type: Number, required: true },
    location: { type: String, required: true },
    hourlyRate: { type: Number },
    datePosted: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Maid', MaidSchema);
