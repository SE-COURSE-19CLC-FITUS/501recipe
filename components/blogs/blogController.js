'use strict';

const {
  BLOG_PER_PAGE,
  BLOG_PAGE_LIMIT,
  COMMENT_PER_PAGE,
  COMMENT_PAGE_LIMIT,
} = require('../../config/constants.js');

const blogService = require('./blogServices.js');
const bookmarkService = require('../bookmarks/bookmarkService');
const commentService = require('../comment/commentServices.js');
const { timeSince } = require('../../helpers/index.js');

exports.blogsInPage = async function (req, res) {
  // Pages have index 1, instead of 0
  let curPage = +req.query.page || 1;
  let { keyword } = req.query;
  let filter = {};

  if (keyword) {
    filter.title = { $regex: keyword, $options: 'i' };
  }

  const blogs = await blogService.findByPage(filter, curPage, BLOG_PER_PAGE);

  let numBlogs;
  if (Object.keys(filter).length === 0) {
    numBlogs = await blogService.countBlogs();
  } else {
    numBlogs = blogs.length;
  }

  // FIXME: Kinda boilerplate code. Should I add it to blogService?
  const limitPage = BLOG_PAGE_LIMIT;
  // Because page has index 1, so we have to decrease the curPage
  // So with limitPage is 4, we have turn 0: [1, 2, 3, 4], turn 1: [5, 6, 7, 8]
  const pageTurn = Math.floor((curPage - 1) / limitPage);
  const numPages = Math.ceil(numBlogs / BLOG_PER_PAGE);

  res.render('blogs/views/blogs.hbs', {
    blogs,
    curPage,
    limitPage,
    pageTurn,
    numPages,
  });
};

exports.getBlogBySlug = async function (req, res) {
  const blog = await blogService.findBySlug(req.params.slug);
  // NOTE: Remember to convert page to number
  const curCommentPage = +req.query['comment-page'] || 1;

  const comments = await commentService.getComments(
    'blog',
    blog._id,
    curCommentPage,
    COMMENT_PER_PAGE
  );

  // FIXME: Kinda boilerplate code. Should I add it to blogService?
  const limitCommentPage = COMMENT_PAGE_LIMIT;
  // Because page has index 1, so we have to decrease the curPage
  // So with limitPage is 4, we have turn 0: [1, 2, 3, 4], turn 1: [5, 6, 7, 8]
  const commentPageTurn = Math.floor((curCommentPage - 1) / limitCommentPage);
  const numComments = await commentService.countComments('blog', blog._id);
  const numCommentPages = Math.ceil(numComments / COMMENT_PER_PAGE);

  comments.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
  comments.map(comment => {
    comment.createAt = timeSince(comment.createAt);
    return comment;
  });

  // blog.bookmark = 'Add to Bookmark';
  // if (req.user) {
  //   const userId = req.user._id;
  //   const bookmark = await bookmarkService.findBookmark(userId, recipe._id);
  //   if (bookmark.length !== 0) {
  //     recipe.bookmark = 'Added to Bookmark';
  //   }
  // }
  res.render('blogs/views/detailBlog.hbs', {
    blog,
    comments,
		numComments,
    curCommentPage,
    limitCommentPage,
    commentPageTurn,
    numCommentPages,
  });
};

exports.postComment = async (req, res, next) => {
  await commentService.postComment(
    'blog',
    req.body.name,
    req.body.blogId,
    req.body.comment
  );
  res.redirect(`/blogs/${req.body.slug}#leave-comment`);
};
