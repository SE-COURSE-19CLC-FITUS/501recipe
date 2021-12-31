const recipeService = require('../recipes/recipeServices');

class Home {
  async index(req, res, next) {
    let recipe = await recipeService.getTop7Rating();
    //Muốn đề trong 1 object nhưng ko biết tại sao lại lỗi :))
    let top1 = recipe[0];
    let top2 = recipe[1];
    let top3 = recipe[2];
    let top4 = recipe[3];
    let top5 = recipe[4];
    let top6 = recipe[5];
    let top7 = recipe[6];
    //console.log('hotRecipe', hotRecipe);

    res.render('index.hbs', { top1, top2, top3, top4, top5, top6, top7 });
  }
}
module.exports = new Home();
