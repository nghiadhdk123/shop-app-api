const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./Category');

const Product = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: Category, 
    },
    slug: {type: String},
    image: {type: String, default: null},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
},{
    timestamp: true,
}
);

module.exports = mongoose.model('Product', Product);