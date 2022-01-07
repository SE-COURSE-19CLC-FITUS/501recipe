'use strict';

module.exports = {
  multipleMongooseToObject: function (mongooseArray) {
    return mongooseArray.map(mongooseArray => mongooseArray.toObject());
  },

  mongooseToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  },
}; // Object with 2 attribute
