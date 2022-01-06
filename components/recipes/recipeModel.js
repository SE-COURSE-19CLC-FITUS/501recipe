'use strict';

const mongoose = require('mongoose');
const slugGenerator = require('mongoose-slug-generator');
const { LOCALE } = require('../../config/constants.js');
mongoose.plugin(slugGenerator);

const options = { toObject: { virtuals: true, getters: true }, toJSON: { virtuals: true, getters: true } };

const dateFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

const getRatingOverall = function () {
  const { five, four, three, two, one } = this.rating;
  const totalRating = +five + +four + +three + +two + +one;
  if (!totalRating) return 0;

  return (+five * 5 + +four * 4 + +three * 3 + +two * 2 + +one * 1) / totalRating;
};

const recipeSchema = mongoose.Schema(
  {
    datePublish: {
      type: Date,
      get: function (date) {
        return new Intl.DateTimeFormat(LOCALE, dateFormatOptions).format(date);
      },
    },
    imageUrl: [{ type: String }],
    ingredients: [{ text: { type: String, trim: true } }],
    instructions: [{ text: { type: String, trim: true } }],
    levelSkill: {
      type: String,
      enum: {
        values: ['Dễ', 'Trung bình', 'Khó'],
        message: '{VALUE} is not supported',
      },
    },
    mealType: {
      type: String,
      enum: {
        values: ['Breakfast', 'Starter', 'Lunch', 'Dinner', 'Dessert'],
        message: '{VALUE} is not supported',
      },
      get: function (val) {
        return val[0].toUpperCase() + val.slice(1);
      },
    },
    publisher: { id: mongoose.ObjectId, username: String },
    rating: {
      five: { type: Number, default: 0 },
      four: { type: Number, default: 0 },
      three: { type: Number, default: 0 },
      two: { type: Number, default: 0 },
      one: { type: Number, default: 0 },
    },
    ratingOverall: {
      type: mongoose.Decimal128,
      default: getRatingOverall,
			get: function(val) {
				return "" + parseFloat(val).toFixed(1);
			}
    },
    servings: { type: Number, min: [1, 'Must at least 1, got {VALUE}'] },
    slug: {
      type: String,
      slug: 'title',
    },
    tags: [{ text: { type: String, trim: true } }],
    timeCook: {
      type: String,
      validate: {
        validator: function (val) {
          return /^\d+\s*(giây|phút|giờ)$/.test(val);
        },
        message:
          'The value must have number and time unit, time unit must in "giây, phút, giờ"',
      },
    },
    tips: [{ text: { type: String, trim: true } }],
    title: { type: String, trim: true },
  },
  options
);

recipeSchema.post('updateOne', async function () {
	// Because updateOne bound to Query, sa we have to get document current
	// updating then use set to set new value. If want updateOne bound to Document,
	// go to doc online.
  const recipeToUpdate = await this.model.findOne(this.getQuery());
  const ratingOverallValue = getRatingOverall.call(recipeToUpdate);

	recipeToUpdate.ratingOverall = ratingOverallValue;
	await recipeToUpdate.save();

	// For pre hook
  // this.set({ ratingOverall: ratingOverallValue });
});


module.exports = mongoose.model('Recipe', recipeSchema, 'recipes');
