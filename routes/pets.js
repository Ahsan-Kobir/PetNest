const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// Public routes
router.get('/', petController.getPets);
router.get('/:petId', petController.getPetById);
router.get('/categories', petController.getCategories);

module.exports = router;