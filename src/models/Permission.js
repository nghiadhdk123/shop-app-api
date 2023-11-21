const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    code: {
        type: String,
    },
    description: {
        type: String,
    },
}, {
    timestamp: true,
});

module.exports = mongoose.model('Permission', PermissionSchema);
