'use strict';

const Recipe = require('./recipeModel');
const mongoose = require('mongoose');
const mongooseObject = require('../../utils/mongooseUtil');

exports.getUserRecipes = async userId => {
  const result = await Recipe.find({
    'publisher.id': new mongoose.Types.ObjectId(userId),
  });
  return mongooseObject.multipleMongooseToObject(result);
};

exports.deleteUserRecipe = recipeId => {
  Recipe.remove({ _id: new mongoose.Types.ObjectId(recipeId) }, function (err) {
    if (err) return false;
  });
  return true;
};
