'use strict';

const Recipe = require('./recipeModel.js');
const mongoose = require('mongoose');
const mongooseObject = require('../../utils/mongoose');
exports.list = () => Recipe.find({});

exports.count = () => Recipe.find().count();

exports.findByPage = (page, itemPerPage) =>
	// Pages have index 1, instead of 0. So if page is 1, then we don't skip
  Recipe.find({})
    .skip((page - 1) * itemPerPage)
    .limit(itemPerPage);

exports.findBySlug = slug => Recipe.findOne({ slug: slug });

exports.saveRecipe = async recipe => {
  const newRecipe = new Recipe(recipe);
  const result = await newRecipe.save();
  return result;
};
exports.getRecipeById = async recipeId => {
  const result = await Recipe.findOne({
    _id: new mongoose.Types.ObjectId(recipeId),
  });
  return mongooseObject.mongooseToObject(result);
};
exports.getTop7Rating = async () => {
  const filter = {
    rating: {
      $gte: 4.5,
    },
  };
  const result = await Recipe.find(filter).sort({ rating: -1 }).limit(7);
  return mongooseObject.multipleMongooseToObject(result);
};
