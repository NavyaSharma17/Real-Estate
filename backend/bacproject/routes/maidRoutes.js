const express = require('express');
const router = express.Router();
const maidController = require('../controllers/maidController');

// Routes for CRUD operations on maids
router.post('/', maidController.createMaid);
router.get('/', maidController.getMaids);
router.get('/:id', maidController.getMaidById);
router.put('/:id', maidController.updateMaid);
router.delete('/:id', maidController.deleteMaid);

module.exports = router;