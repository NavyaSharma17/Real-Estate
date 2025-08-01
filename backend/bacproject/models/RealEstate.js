const mongoose = require('mongoose');

const RealEstateSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    image: { type: String },
    datePosted: { type: Date, default: Date.now },
});

module.exports = mongoose.model('RealEstate', RealEstateSchema);