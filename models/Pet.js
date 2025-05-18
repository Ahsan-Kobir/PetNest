const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  age: { type: Number, min: 0 },
  gender: { type: String, enum: ['male', 'female'] },
  location: String,
  description: String,
  images: [String],
  thumbnailUrl: String,
  status: { 
    type: String, 
    enum: ['available', 'adopted'], 
    default: 'available' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Pet', PetSchema);