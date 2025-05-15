const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

module.exports = {
  registerUser: async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) throw new Error('User already exists');

    const user = await User.create(userData);
    return {
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    };
  },

  loginUser: async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    return {
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    };
  }
};