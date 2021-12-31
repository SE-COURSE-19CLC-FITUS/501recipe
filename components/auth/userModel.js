'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isMobilePhone, isEmail } = require('validator');
const { LOCALE } = require('../../config/constants.js');

const userSchema = Schema({
  username: String,
  password: String,
  nameFirst: String,
  nameLast: String,
  birthday: Date,
  email: {
    type: String,
    validate: {
      validator: isEmail,
      message: 'Wrong email format',
    },
  },
  phone: {
    type: String,
    validate: {
      validator: function (val) {
        return isMobilePhone(val, [LOCALE]);
      },
      message: 'Invalid phone number',
    },
  },
  status: String,
});

userSchema.virtual('nameFull').get(function () {
  return `${this.nameFirst}${this.nameLast}`;
});

module.exports = mongoose.model('User', userSchema, 'user');
