'use strict';

const Recipe = require('./recipeModel.js');

exports.list = () => Recipe.find({});

exports.findByPage = (page, itemPerPage) =>
  Recipe.find({})
    .skip(page * itemPerPage)
    .limit(itemPerPage);

exports.findBySlug = slug => Recipe.findOne({ slug: slug });
