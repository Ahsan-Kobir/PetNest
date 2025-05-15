const adoptionService = require('../services/adoptionService');

exports.submitAdoption = async (req, res, next) => {
  try {
    const result = await adoptionService.submitAdoption(
      req.user.id,
      req.body.petId,
      req.body.message
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getAdoptions = async (req, res, next) => {
  try {
    const adoptions = await adoptionService.getAdoptions(req.user.id);
    res.json(adoptions);
  } catch (error) {
    next(error);
  }
};

exports.getAdoptionDetails = async (req, res, next) => {
  try {
    const adoption = await adoptionService.getAdoptionDetails(
      req.params.requestId
    );
    res.json(adoption);
  } catch (error) {
    next(error);
  }
};