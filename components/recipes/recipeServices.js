'use strict';

const Recipe = require('./recipeModel');
const mongoose = require('mongoose');
const mongooseObject = require('../../utils/mongooseUtil');
const { NUMBER_TOP_RECIPE } = require('../../config/constants.js');

exports.list = () => Recipe.find({});

exports.countRecipes = () => Recipe.find().count();

exports.findByPage = (filter, sort, page, itemPerPage) => {
  // Pages have index 1, instead of 0. So if page is 1, then we don't skip
  if (sort && sort != '0') {
    const result = Recipe.find(filter)
      .skip((page - 1) * itemPerPage)
      .limit(itemPerPage)
      .sort({ ratingOverall: sort });
    return result;
  } else {
    const result = Recipe.find(filter)
      .skip((page - 1) * itemPerPage)
      .limit(itemPerPage);
    return result;
  }
};

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
  await Recipe.find({ slug: slug }).updateOne({
    $inc: { [`rating.${field}`]: 1 },
  });
};

exports.getPopularRecipe = () => Recipe.find().sort({ ratingOverall: -1 }).limit(3).lean()

exports.getTopNRecipes = (n) => Recipe.find().sort({ratingOverall:-1}).limit(n)
