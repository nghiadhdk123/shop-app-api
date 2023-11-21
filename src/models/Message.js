const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Chat = require('./Chat');

const MessageSchema = new Schema({
    chatId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: Chat,
    },
    senderId: {
        type:  mongoose.Schema.Types.ObjectId,
    },
    message: {
        type: String,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Message", MessageSchema);