'use strict';

const {
  RECIPE_PER_PAGE,
  RECIPE_PAGE_LIMIT,
  COMMENT_PER_PAGE,
  COMMENT_PAGE_LIMIT,
} = require('../../config/constants.js');

const recipeService = require('./recipeServices.js');
const bookmarkService = require('../bookmarks/bookmarkService');
const commentService = require('../comment/commentServices.js');
const { timeSince } = require('../../helpers/index.js');

exports.recipesInPage = async function (req, res) {
  // Pages have index 1, instead of 0
  let curPage = +req.query.page || 1;
  let { mealType, keyword } = req.query;
  let filter = {};
  if (mealType) {
    filter.mealType = mealType;
  }
  if (keyword) {
    filter.title = { $regex: keyword, $options: 'i' };
  }

  const recipes = await recipeService.findByPage(
    filter,
    curPage,
    RECIPE_PER_PAGE
  );

  let numRecipes;
  if (Object.keys(filter).length === 0) {
    numRecipes = await recipeService.countRecipes();
  } else {
    numRecipes = recipes.length;
  }

  // FIXME: Kinda boilerplate code. Should I add it to recipeService?
  const limitPage = RECIPE_PAGE_LIMIT;
  // Because page has index 1, so we have to decrease the curPage
  // So with limitPage is 4, we have turn 0: [1, 2, 3, 4], turn 1: [5, 6, 7, 8]
  const pageTurn = Math.floor((curPage - 1) / limitPage);
  const numPages = Math.ceil(numRecipes / RECIPE_PER_PAGE);

  res.render('recipes/views/recipes.hbs', {
    recipes,
    curPage,
    limitPage,
    pageTurn,
    numPages,
  });
};

exports.getRecipeBySlug = async function (req, res) {
  const recipe = await recipeService.findBySlug(req.params.slug);
  // NOTE: Remember to convert page to number
  const curCommentPage = +req.query['comment-page'] || 1;

  const comments = await commentService.getRecipeComments(
    'recipe',
    recipe._id,
    curCommentPage,
    COMMENT_PER_PAGE
  );

  // FIXME: Kinda boilerplate code. Should I add it to recipeService?
  const limitCommentPage = COMMENT_PAGE_LIMIT;
  // Because page has index 1, so we have to decrease the curPage
  // So with limitPage is 4, we have turn 0: [1, 2, 3, 4], turn 1: [5, 6, 7, 8]
  const commentPageTurn = Math.floor((curCommentPage - 1) / limitCommentPage);
  const numComments = await commentService.countComments('recipe', recipe._id);
  const numCommentPages = Math.ceil(numComments / COMMENT_PER_PAGE);

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
    curCommentPage,
    limitCommentPage,
    commentPageTurn,
    numCommentPages,
  });
};

exports.postComment = async (req, res, next) => {
  await commentService.postComment(
    'recipe',
    req.body.name,
    req.body.recipeId,
    req.body.comment
  );
  res.redirect(`/recipes/${req.body.slug}#leave-comment`);
};
