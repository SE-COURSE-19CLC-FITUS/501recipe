'use strict';
const userRecipeServices = require('./userRecipeServices');

class userRecipe {
  async getUserRecipes(req, res, next) {
    const userId = req.user._id;
    const recipes = await userRecipeServices.getUserRecipes(userId);
    recipes.forEach(recipe => {
      recipe.isUser = true;
    });

    res.render('recipes/views/recipes.hbs', { recipes });
  }
  async deleteUserRecipe(req, res, next) {
    const recipeId = req.body.id;
    const result = await userRecipeServices.deleteUserRecipe(recipeId);
    if (result) {
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }
  }
}

module.exports = new userRecipe();
