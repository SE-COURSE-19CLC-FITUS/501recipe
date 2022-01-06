'use strict';

const Recipe = require('./recipeModel');
const Comment = require('../comment/commentModel.js');
const mongoose = require('mongoose');
const mongooseObject = require('../../utils/mongooseUtil');
const { NUMBER_TOP_RECIPE } = require('../../config/constants.js');

exports.list = () => Recipe.find({});

exports.countRecipes = () => Recipe.find().count();

exports.findByPage = (filter, page, itemPerPage) =>
  // Pages have index 1, instead of 0. So if page is 1, then we don't skip
  Recipe.find(filter)
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
exports.getTopRecipes = async () => {
  const filter = {
    ratingOverall: {
			// FIXME:
      $gte: 4.5,
    },
  };
  const result = await Recipe.find(filter)
	.sort({ rating: -1 })
	.limit(NUMBER_TOP_RECIPE);

  return mongooseObject.multipleMongooseToObject(result);
};

exports.updateRating = async (slug, ratingPoint) => {
  const ratingPointName = ['one', 'two', 'three', 'four', 'five'];
  const field = ratingPointName[ratingPoint - 1];
  await Recipe.find({ slug: slug }).updateOne({ $inc: { [`rating.${field}`]: 1 } });
};
