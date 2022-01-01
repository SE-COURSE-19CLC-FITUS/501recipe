'use strict';

const {
  RECIPE_PER_PAGE,
  PAGE_PER_SLIDE,
} = require('../../config/constants.js');

const recipeService = require('./recipeServices.js');
const bookmarkService = require('../bookmarks/bookmarkService');
exports.recipesInPage = async function (req, res) {
  let curPage = +req.query.page;
  let mealType = req.query.mealType;
  let keyword = req.query.keyword;
  let filter = {};
  if (mealType) {
    filter.mealType = mealType;
  }
  if (keyword) {
    filter.title = { $regex: keyword, $options: 'i' };
  }
  // Pages have index 1, instead of 0
  if (!curPage) curPage = 1;

  const recipes = await recipeService.findByPage(
    filter,
    curPage,
    RECIPE_PER_PAGE
  );
  const numRecipes = await recipeService.count();

  const limitPage = PAGE_PER_SLIDE;
  // Because page has index 1, so we have to increase limit
  // So with limitPage is 4, we have turn 0: [1, 2, 3, 4], turn 1: [5, 6, 7, 8]
  const pageTurn = Math.floor(curPage / (limitPage + 1));
  const numPages = Math.ceil(numRecipes / RECIPE_PER_PAGE);

  res.render('recipes/views/recipes.hbs', {
    curPage,
    pageTurn,
    limitPage,
    numRecipes,
    numPages,
    recipes,
  });
};

exports.getRecipeBySlug = async function (req, res) {
  const recipe = await recipeService.findBySlug(req.params.slug);
  const comments = await recipeService.getRecipeComments(recipe._id);
  comments.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
  comments.map(comment => {
    comment.createAt = timeSince(comment.createAt);
    return comment;
  });
  recipe.bookmark = 'Add to Bookmark';
  if (req.user) {
    const userId = req.user._id;
    const bookmark = await bookmarkService.findBookmark(userId, recipe._id);
    if (bookmark.length !== 0) {
      recipe.bookmark = 'Added to Bookmark';
    }
  }

  res.render('recipes/views/detailRecipe.hbs', {
    recipe,
    comments,
  });
};

exports.postComment = async (req, res, next) => {
  const comment = await recipeService.postComment(
    req.body.name,
    req.body.recipeId,
    req.body.comment
  );
  res.redirect(`/recipes/${req.body.slug}#leave-comment`);
};

function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
}
