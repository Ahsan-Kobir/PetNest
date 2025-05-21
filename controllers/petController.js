const petService = require('../services/petService');

exports.getPets = async (req, res, next) => {
  try {
    const filters = {
      ...(req.query.categoryId && { category: req.query.categoryId }),
      ...(req.query.age_min && { age: { $gte: req.query.age_min } }),
      ...(req.query.age_max && { age: { $lte: req.query.age_max } }),
      ...(req.query.location && { location: req.query.location })
    };

    const result = await petService.listPets(filters, {
      page: req.query.page,
      limit: req.query.limit
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.getPetById = async (req, res, next) => {
  try {
    const pet = await petService.getPetById(req.params.petId);
    res.json(pet);
  } catch (error) {
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await petService.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// Temporary for rana vai
exports.addPet = async (req, res, next) => {
  try {
    const pet = await petService.addPet(
      req.body
    );
    res.json(pet);
  } catch (error) {
    next(error);
  }
};