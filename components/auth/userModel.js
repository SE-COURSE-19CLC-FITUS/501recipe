const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    birthday: String,
    email: String,
    phone: String,
    status: String,
});

const User = mongoose.model('User', userSchema, 'user');
module.exports = User;