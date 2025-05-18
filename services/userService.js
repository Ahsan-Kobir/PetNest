const User = require('../models/User');
const { toJSON } = require('../utils/helpers');

module.exports = {
  getUserProfile: async (userId) => {
    const profile = await User.findById(userId)
      .select('-password -refreshToken -favorites');
    return toJSON(profile);
  },

  updateUserProfile: async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password -refreshToken');

    if (!user) throw new Error('User not found');
    return toJSON(user);
  }
};