'use strict';

const express = require('express');
const router = express.Router();
const blogController = require('./blogController.js');

router.get('/blogs', blogController.blogsInPage);
router.get('/blogs?page=', blogController.blogsInPage);
router.get('/blogs/:slug', blogController.getBlogBySlug);

// router.post('/blogs/post-comment', blogController.postComment);

module.exports = router;
