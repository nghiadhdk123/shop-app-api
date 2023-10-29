const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
        name: { type: String, required: true },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
        slug: { type: String, unique: true },
    }, {
        timestamp: true,
    }
);

module.exports = mongoose.model('Category', Category);