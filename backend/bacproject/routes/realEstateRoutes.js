const express = require('express');
const router = express.Router();
const realEstateController = require('../controllers/realEstateController');

// Routes for CRUD operations on real estate
router.post('/', realEstateController.createRealEstate);
router.get('/', realEstateController.getRealEstates);
router.get('/:id', realEstateController.getRealEstateById);
router.put('/:id', realEstateController.updateRealEstate);
router.delete('/:id', realEstateController.deleteRealEstate);

module.exports = router;