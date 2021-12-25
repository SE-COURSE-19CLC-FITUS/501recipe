const recipeService = require('./recipeService');
require('../../helper/hbsHelper.js')();

exports.recipesInPage = async function (req, res) {
  let page = req.query.page;

  if (!page) page = 0;

  const recipes = await recipeService.findByPage(page, 6);

  res.render('recipes/views/recipes.hbs', { recipes });
};

exports.getRecipeBySlug = async function (req, res) {
  const recipe = await recipeService.findBySlug(req.params.slug);

  res.render('recipes/views/recipeDetail.hbs', { recipe });
};
