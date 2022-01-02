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
    //   top3: recipe[2],
    //   top4: recipe[3],
    //   top5: recipe[4],
    //   top6: recipe[5],
    //   top7: recipe[6],
    // };

    res.render('index.hbs', { topRecipe });
  }
}
module.exports = new Home();
