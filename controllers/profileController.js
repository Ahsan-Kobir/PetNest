const userService = require('../services/userService');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUserProfile(
      req.user.id,
      req.body
    );
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};