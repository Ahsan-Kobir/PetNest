const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const { protect } = require('../middleware/auth');
const { validatePetId } = require('../middleware/validators');
const asyncHandler = require('../middleware/asyncHandler');

router.use(protect);

router.post('/', validatePetId, asyncHandler(favoriteController.addFavorite));
router.delete('/:petId', validatePetId, asyncHandler(favoriteController.removeFavorite));
router.get('/', asyncHandler(favoriteController.getFavorites));

module.exports = router;