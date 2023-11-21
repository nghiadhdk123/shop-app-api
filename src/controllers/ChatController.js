const Chat = require('../models/Chat');
const Message = require('../models/Message');

class ChatController
{
    async store(req, res) {
        try {
            //firstId: id người chat thứ nhất
            //secondId: id người chat thứ hai

            const { firstId, secondId } = req.body;

            const chat = await Chat.findOne({
                members: { $all: [firstId, secondId] }
            });

            if(chat) return res.status(200).json({ data: chat });

            const newChat = new Chat({
                members: [firstId, secondId]
            });

            const response = await newChat.save();

            return res.status(200).json({ data: response });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async findChat(req, res) {
        try {
            
            const chatId = req.params.chatId;

            const chats = await Message.find({ chatId: chatId }, 'chatId senderId message createdAt');

            return res.status(200).json({ data: chats, message: 'Success' });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async sendMessage(req, res) {
        try {
            const request = req.body;

           const newMessage = new Message({
                chatId: request.chatId,
                senderId: request.senderId,
                message: request.message
           });

           await newMessage.save();

           return res.status(200).json({ message: 'Success' });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ChatController;
