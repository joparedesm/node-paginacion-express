const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    price: Number,
    category: String,
    description: String,
    image: String
});

module.exports = mongoose.model('Product', ProductSchema);
