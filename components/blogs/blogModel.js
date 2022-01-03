'use strict';

const mongoose = require('mongoose');
const slugGenerator = require('mongoose-slug-generator');
const { LOCALE } = require('../../config/constants.js');
mongoose.plugin(slugGenerator);

const options = { toObject: { virtuals: true }, toJSON: { virtuals: true } };

const dateFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

const blogSchema = mongoose.Schema(
  {
    datePublish: {
      type: Date,
      get: function (date) {
        return new Intl.DateTimeFormat(LOCALE, dateFormatOptions).format(date);
      },
    },
    imageUrl: [{ type: String }],
    content: [{ text: { type: String, trim: true } }],
    publisher: { id: mongoose.ObjectId, username: String },
    slug: {
      type: String,
      slug: 'title',
    },
    tags: [{ text: { type: String, trim: true } }],
    title: { type: String, trim: true },
  },
  options
);

module.exports = mongoose.model('Blog', blogSchema, 'blogs');
