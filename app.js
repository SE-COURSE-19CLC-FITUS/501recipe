'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const logger = require('morgan');

const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');
const authRouter = require('./components/auth');
const recipeRouter = require('./components/recipes/recipeRoutes.js');
const blogRouter = require('./components/blogs/blogRoutes.js');
const submitRecipeRouter = require('./components/recipes/submitRecipeRouter.js');
const bookmarkRouter = require('./components/bookmarks/bookmarkRoutes.js');

const auth = require('./middleware/authMiddleware');
const passport = require('./passport');

const app = express();

const Handlebars = require('hbs');
// Register hbs partials
Handlebars.registerPartials(__dirname + '/views/partials');

// Register hbs helpers
require('./helpers/hbsHelper.js')();

// view engine setup
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'components'),
]);
app.set('view engine', 'hbs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// passport
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', recipeRouter);
app.use('/', blogRouter);
app.use('/', auth, submitRecipeRouter);
app.use('/users', usersRouter);
app.use('/bookmark', auth, bookmarkRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
