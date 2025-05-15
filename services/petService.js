const Pet = require('../models/Pet');
const Category = require('../models/Category');

module.exports = {
  listPets: async (filters = {}, pagination = {}) => {
    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;

    const query = Pet.find(filters)
      .skip(skip)
      .limit(limit)
      .populate('category', 'title');

    return {
      data: await query.exec(),
      pagination: {
        page,
        limit,
        total: await Pet.countDocuments(filters)
      }
    };
  },

  getPetById: async (petId) => {
    const pet = await Pet.findById(petId)
      .populate('category', 'title')
      .populate('suggestedPets');
    
    if (!pet) throw new Error('Pet not found');
    return pet;
  },

  getCategories: async () => {
    return await Category.find({});
  }
};