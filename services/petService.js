const Pet = require('../models/Pet');
const Category = require('../models/Category');
const { isValidObjectId, toJSON } = require('../utils/helpers');
const ErrorResponse = require('../utils/ErrorResponse');

module.exports = {
  listPets: async (filters = {}, pagination = {}) => {
    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;

    const pets = await Pet.find(filters)
      .skip(skip)
      .limit(limit)
      .select('name age location status thumbnailUrl category') // Only needed fields
      .populate('category', 'title')
      .lean();

    // Format each pet
    const formattedPets = pets.map(pet => ({
      id: pet._id.toString(),
      name: pet.name,
      age: pet.age,
      location: pet.location,
      status: pet.status,
      thumbnailUrl: pet.thumbnailUrl,
      category: pet.category
        ? {
          id: pet.category._id.toString(),
          title: pet.category.title
        }
        : null
    }));

    const total = await Pet.countDocuments(filters);

    return {
      data: formattedPets,
      pagination: {
        page,
        limit,
        total
      }
    };
  },


  getPetById: async (petId) => {
    if (!isValidObjectId(petId)) throw new ErrorResponse('Invalid pet ID', 404);

    const pet = await Pet.findById(petId)
      .populate('category', 'title')
      .lean();

    if (!pet) throw new ErrorResponse('Pet not found', 404);

    const formattedPet = {
      id: pet._id.toString(),
      name: pet.name,
      age: pet.age,
      gender: pet.gender,
      location: pet.location,
      description: pet.description,
      images: pet.images,
      status: pet.status,
      category: pet.category
        ? {
          id: pet.category._id.toString(),
          title: pet.category.title
        }
        : null
    };

    const suggested = await Pet.find({ _id: { $ne: pet._id } })
      .limit(3)
      .populate('category', 'title')
      .select('name age category location status thumbnailUrl')
      .lean();

    formattedPet.suggestedPets = suggested.map((s) => ({
      id: s._id.toString(),
      name: s.name,
      age: s.age,
      location: s.location,
      status: s.status,
      thumbnailUrl: s.thumbnailUrl,
      category: s.category
        ? {
          id: s.category._id.toString(),
          title: s.category.title
        }
        : null
    }));

    return formattedPet;
  },


  getCategories: async () => {
    const result = await Category.find({});
    return result.map(toJSON);
  },
};