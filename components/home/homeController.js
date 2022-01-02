'use strict';

const recipeService = require('../recipes/recipeServices');

class Home {
  async index(req, res, next) {
    const recipe = await recipeService.getTopRecipes();
    // Muốn đề trong 1 object nhưng ko biết tại sao lại lỗi :))
    let topRecipe = {};
    recipe.forEach((item, i) => (topRecipe[`top${i + 1}`] = item));
    // {
    //   top1: recipe[0],
    //   top2: recipe[1],
    //   ...
    // };

    res.render('index.hbs', { topRecipe });
  }
}
module.exports = new Home();
