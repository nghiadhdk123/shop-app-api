const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Permission = require('./Permission');

const RoleSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
    },
    permission_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Permission,
    }],
}, {
    timestamp: true,
});

module.exports = mongoose.model('Role', RoleSchema);
