const Adoption = require('../models/Adoption');
const Pet = require('../models/Pet');

module.exports = {
  submitAdoption: async (userId, petId, message) => {
    const pet = await Pet.findById(petId);
    if (!pet) throw new Error('Pet not found');
    if (pet.status === 'adopted') throw new Error('Pet already adopted');

    const adoption = await Adoption.create({
      pet: petId,
      user: userId,
      message
    });

    return {
      requestId: adoption._id,
      status: adoption.status,
      createdAt: adoption.createdAt
    };
  },

  getAdoptions: async (userId) => {
    return await Adoption.find({ user: userId })
      .populate({
        path: 'pet',
        select: 'name thumbnailUrl'
      })
      .sort('-createdAt');
  },

  getAdoptionDetails: async (requestId) => {
    const adoption = await Adoption.findById(requestId)
      .populate('pet', 'name category age location')
      .populate('user', 'name email');

    if (!adoption) throw new Error('Adoption request not found');
    return adoption;
  }
};