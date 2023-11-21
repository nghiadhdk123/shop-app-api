const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Role = require('./Role');

const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    status: {
        type: Number,
        default: 1,
    },
    role_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Role,
    }],
    created_at: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamp: true,
});

module.exports = mongoose.model('User', UserSchema);
