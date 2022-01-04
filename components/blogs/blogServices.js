'use strict';

const Blog = require('./blogModel');
// const Comment = require('./commentModel');
const mongoose = require('mongoose');
const mongooseObject = require('../../utils/mongooseUtil');
const { NUMBER_TOP_BLOG } = require('../../config/constants.js');

exports.list = () => Blog.find({});

exports.countBlogs = () => Blog.find().count();

exports.findByPage = (filter, page, itemPerPage) =>
  // Pages have index 1, instead of 0. So if page is 1, then we don't skip
  Blog.find(filter)
    .skip((page - 1) * itemPerPage)
    .limit(itemPerPage);

exports.findBySlug = slug => Blog.findOne({ slug: slug });

exports.saveBlog = async blog => {
  const newBlog = new Blog(blog);
  const result = await newBlog.save();
  return result;
};
exports.getBlogById = async blogId => {
  const result = await Blog.findOne({
    _id: new mongoose.Types.ObjectId(blogId),
  });
  return mongooseObject.mongooseToObject(result);
};
exports.getTopBlogs = async () => {
  const filter = {
    rating: {
      $gte: 4.5,
    },
  };
  const result = await Blog.find(filter)
    .sort({ rating: -1 })
    .limit(NUMBER_TOP_BLOG);
  return mongooseObject.multipleMongooseToObject(result);
};
