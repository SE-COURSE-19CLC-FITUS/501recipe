'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;
const { emailValidation, phoneValidation } = require('../../helpers/index.js');

const userSchema = Schema({
  username: String,
  password: String,
  nameFirst: String,
  nameLast: String,
  birthday: Date,
  email: {
    type: String,
    validate: {
      validator: emailValidation,
      message: 'Wrong email format',
    },
  },
  phone: {
    type: String,
    validate: {
      validator: phoneValidation,
      message: 'Invalid phone number',
    },
  },
  status: String,
});

module.exports = mongoose.model('User', userSchema, 'user');
