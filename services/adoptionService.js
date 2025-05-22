const Adoption = require('../models/Adoption');
const Pet = require('../models/Pet');

module.exports = {
  submitAdoption: async (userId, petId, message, address, contact) => {
    const pet = await Pet.findById(petId);
    if (!pet) throw new Error('Pet not found');
    if (pet.status === 'adopted') throw new Error('Pet already adopted');

    const adoption = await Adoption.create({
      pet: petId,
      user: userId,
      message,
      address,
      contact
    });

    return {
      requestId: adoption._id,
      status: adoption.status,
      createdAt: adoption.createdAt
    };
  },
  getAdoptions: async (userId) => {
    const adoptions = await Adoption.find({ user: userId })
      .populate({
        path: 'pet',
        select: 'name thumbnailUrl'
      })
      .sort('-createdAt')
      .lean();

    return adoptions.map(adoption => ({
      id: adoption._id.toString(),
      pet: adoption.pet
        ? {
          id: adoption.pet._id.toString(),
          name: adoption.pet.name,
          thumbnailUrl: adoption.pet.thumbnailUrl
        }
        : null,
      message: adoption.message,
      address: adoption.address,
      contact: adoption.contact,
      status: adoption.status,
      createdAt: adoption.createdAt
    }));
  },

  getAdoptionDetails: async (requestId) => {
    const adoption = await Adoption.findById(requestId)
      .populate('pet', 'name category age location price breed')
      .populate('user', 'name email')
      .lean();

    if (!adoption) throw new Error('Adoption request not found');

    return {
      id: adoption._id.toString(),
      pet: adoption.pet
        ? {
          id: adoption.pet._id.toString(),
          name: adoption.pet.name,
          age: adoption.pet.age,
          price: adoption.pet.price,
          breed: adoption.pet.breed,
          location: adoption.pet.location,
          category: adoption.pet.category?._id
            ? {
              id: adoption.pet.category._id.toString(),
              title: adoption.pet.category.title
            }
            : null
        }
        : null,
      user: adoption.user
        ? {
          id: adoption.user._id.toString(),
          name: adoption.user.name,
          email: adoption.user.email
        }
        : null,
      message: adoption.message,
      address: adoption.address,
      contact: adoption.contact,
      status: adoption.status,
      createdAt: adoption.createdAt
    };
  }

};