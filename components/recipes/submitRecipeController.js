'use strict';

const recipeService = require('./recipeServices');
const mongoose = require('mongoose');
const formidable = require('formidable'); //npm i formidable
const cloudinary = require('cloudinary').v2; //npm i cloudinary
class SubmitRecipe {
  show(req, res, next) {
    res.render('recipes/views/submitRecipe');
  }
  async submit(req, res, next) {
    const { _id: userId, username } = req.user;

    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      let ingredients;
      if (typeof fields.ingredients === 'string') {
        ingredients = [{ text: fields.ingredients }];
      } else {
        ingredients = fields.ingredients.map(ingredient => ({
          text: ingredient,
        }));
      }
      let steps;
      if (typeof fields.steps === 'string') {
        steps = [{ text: fields.steps }];
      } else {
        steps = fields.steps.map(step => ({ text: step }));
      }
      let tips;
      if (typeof fields.tips === 'string') {
        tips = [{ text: fields.tips }];
      } else {
        tips = fields.tips.map(tip => ({ text: tip }));
      }
      let imageUrl = [];
      for (let i = 0; i < files.fileUpload.length; i++) {
        let file = files.fileUpload[i];
        await cloudinary.uploader.upload(
          file.filepath,
          { public_id: `NMCNPM/${file.originalFilename}` }, //thay đổi đường dẫn và tên file
          function (error, result) {
            //console.log(result);
            imageUrl.push(result.url);
          }
        ); //result.url là link ảnh
      }

      if (err) {
        next(err);
        return;
      }

      const recipe = {
        _id: new mongoose.Types.ObjectId(),
        datePublish: new Date(),
        ingredients: ingredients,
        instructions: steps,
        imageUrl: imageUrl,
        levelSkill: fields.skill,
        mealType: fields.mealType,
        publisher: { id: userId, username },
        rating: 0,
        servings: fields.servings,
        tags: fields.tags.split(',').map(tag => ({
          text: tag,
        })),
        timeCook: fields.cookTime,
        tips: tips,
        title: fields.title,
      };
      const result = await recipeService.saveRecipe(recipe);
      if (result) {
        //res.status(200).json({ message: 'Thêm thành công', success: true });
        res.send('<p>successfull</p>');
      } else {
        //res.status(500).json({ message: 'Thêm thất bại', success: false });
      }
    });
  }
}

module.exports = new SubmitRecipe();
