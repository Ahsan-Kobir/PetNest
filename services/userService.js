const User = require('../models/User');

module.exports = {
  getUserProfile: async (userId) => {
    return await User.findById(userId)
      .select('-password -refreshToken -favorites');
  },

  updateUserProfile: async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password -refreshToken');

    if (!user) throw new Error('User not found');
    return user;
  }
};