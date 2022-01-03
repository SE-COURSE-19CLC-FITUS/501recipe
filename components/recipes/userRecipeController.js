'use strict';
const userRecipeServices = require('./userRecipeServices');

class userRecipe {
  async getUserRecipes(req, res, next) {
    const userId = req.user._id;
    const recipes = await userRecipeServices.getUserRecipes(userId);

    res.render('recipes/views/recipes.hbs', { recipes });
  }
}

module.exports = new userRecipe();
