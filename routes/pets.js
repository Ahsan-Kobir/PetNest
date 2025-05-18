const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// Public routes
router.get('/', petController.getPets);
router.get('/categories', petController.getCategories);
router.get('/:petId', petController.getPetById);

module.exports = router;