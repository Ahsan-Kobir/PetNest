const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { protect } = require('../middleware/auth');
const { validateProfileUpdate } = require('../middleware/validators');
const asyncHandler = require('../middleware/asyncHandler');

router.use(protect);

router.get('/', asyncHandler(profileController.getProfile));
router.put('/', validateProfileUpdate, asyncHandler(profileController.updateProfile));

module.exports = router;