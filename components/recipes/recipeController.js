'use strict';
const { RECIPE_PER_PAGE, PAGE_PER_SLIDE } = require('../../config/constants.js');

const recipeService = require('./recipeServices.js');
const bookmarkService = require('../bookmarks/bookmarkService');
exports.recipesInPage = async function (req, res) {
  let curPage = +req.query.page;

	// Pages have index 1, instead of 0
  if (!curPage) curPage = 1;

  const recipes = await recipeService.findByPage(curPage, RECIPE_PER_PAGE);
  const numRecipes = await recipeService.count();
  console.log("numRecipes", numRecipes);

	const limitPage = PAGE_PER_SLIDE;
	console.log("limitPage", limitPage);
	// Because page has index 1, so we have to increase limit
	// So with limitPage is 4, we have turn 0: [1, 2, 3, 4], turn 1: [5, 6, 7, 8]
	const pageTurn = Math.floor(curPage / (limitPage + 1));
	console.log("pageTurn", pageTurn);
	const numPages = Math.ceil(numRecipes / RECIPE_PER_PAGE);
	console.log("numPages", numPages);

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
  recipe.bookmark = 'Add to Bookmark'; //cái này dùng để phân biệt giữa việc đã add hay chưa, xem thêm ở script cuổi
  //trang detailRecipe.hbs
  if (req.user) {
    const userId = req.user._id;
    const bookmark = await bookmarkService.findBookmark(userId, recipe._id);
    if (bookmark.length !== 0) {
      recipe.bookmark = 'Added to Bookmark';
    }
  }

  res.render('recipes/views/detailRecipe.hbs', { recipe });
};
