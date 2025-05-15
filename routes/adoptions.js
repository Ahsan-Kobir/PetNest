const express = require('express');
const router = express.Router();
const adoptionController = require('../controllers/adoptionController');
const { protect } = require('../middleware/auth');
const { validateAdoption, validateRequestId } = require('../middleware/validators');
const asyncHandler = require('../middleware/asyncHandler');

router.use(protect);

router.post('/', validateAdoption, asyncHandler(adoptionController.submitAdoption));
router.get('/', asyncHandler(adoptionController.getAdoptions));
router.get('/:requestId', validateRequestId, asyncHandler(adoptionController.getAdoptionDetails));
module.exports = router;