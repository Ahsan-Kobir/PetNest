const mongoose = require('mongoose');

exports.toJSON = (document) => {

    const obj = document.toObject ? document.toObject() : document;
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;

    if (obj.category && typeof obj.category === 'object' && obj.category._id) {
        obj.category.id = obj.category._id.toString();
        delete obj.category._id;
        delete obj.category.__v;
    }

    return {
        id: obj.id,
        ...obj
    };
};

exports.isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};