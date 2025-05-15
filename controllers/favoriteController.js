const favoriteService = require('../services/favoriteService');

exports.addFavorite = async (req, res, next) => {
  try {
    const result = await favoriteService.addFavorite(
      req.user.id, 
      req.body.petId
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

exports.removeFavorite = async (req, res, next) => {
  try {
    const result = await favoriteService.removeFavorite(
      req.user.id, 
      req.params.petId
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.getFavorites = async (req, res, next) => {
  try {
    const favorites = await favoriteService.getFavorites(req.user.id);
    res.json(favorites);
  } catch (error) {
    next(error);
  }
};