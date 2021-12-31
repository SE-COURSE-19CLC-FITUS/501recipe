'use strict';

const recipeService = require('./recipeServices.js');
const bookmarkService = require('../bookmarks/bookmarkService');
exports.recipesInPage = async function (req, res) {
  let { page } = req.query;

  if (!page) page = 0;

  const recipes = await recipeService.findByPage(page, 6);

  res.render('recipes/views/recipes.hbs', { recipes });
};

exports.getRecipeBySlug = async function (req, res) {
  const recipe = await recipeService.findBySlug(req.params.slug);
  recipe.bookmark = 'Add to Bookmark'; //cái này dùng để phân biệt giữa việc đã add hay chưa, xem thêm ở script cuổi
  //trang detailRecipe
  if (req.user) {
    const userId = req.user._id;
    const bookmark = await bookmarkService.findBookmark(userId, recipe._id);
    if (bookmark.length !== 0) {
      recipe.bookmark = 'Added to Bookmark';
    }
  }

  res.render('recipes/views/detailRecipe.hbs', { recipe });
};
