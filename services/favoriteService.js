const User = require('../models/User');
const Pet = require('../models/Pet');

module.exports = {
  addFavorite: async (userId, petId) => {
    const pet = await Pet.findById(petId);
    if (!pet) throw new Error('Pet not found');

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: petId } },
      { new: true }
    );

    return { message: 'Pet added to favorites' };
  },

  removeFavorite: async (userId, petId) => {
    await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: petId } }
    );

    return { message: 'Pet removed from favorites' };
  },

  getFavorites: async (userId) => {
    const user = await User.findById(userId)
      .populate({
        path: 'favorites',
        select: 'name age location thumbnailUrl status',
        populate: {
          path: 'category',
          select: 'title'
        }
      });

    return user.favorites;
  }
};