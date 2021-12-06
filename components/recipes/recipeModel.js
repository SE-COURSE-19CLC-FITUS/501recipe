const mongoose = require('mongoose')

const schema = mongoose.Schema({
    titile: String,
    image: Buffer,
    image2: String,
    material: String,
    care: String,
    brand: String,
    color: String,
    size: Array,
    imageType: String,
    description: String
})

module.exports = mongoose.model('Recipes', schema, 'recipes')