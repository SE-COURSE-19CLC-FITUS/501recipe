'use strict';

const bcrypt = require('bcrypt');

const userModel = require('./userModel');

exports.findByUsername = username =>
  userModel
    .findOne({
      username: username,
    })
    .lean();

exports.checkExists = email => userModel.find({ email: email }).limit(1).size();

exports.findByEmail = email =>
  userModel
    .findOne({
      email: email,
    })
    .lean();

exports.findById = id => userModel.findById(id);

exports.validPassword = (password, user) => {
  return bcrypt.compare(password, user.password);
};

exports.register = async (username, email, password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return userModel.create({
    username: username,
    email: email,
    password: passwordHash,
  });
};
