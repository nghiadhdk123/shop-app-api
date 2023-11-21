const bcrypt = require('bcrypt');
const User = require('../models/User');

class UserController {

    async listUser(req, res) {
        try {
            const users = await User.find({}, 'name email created_at status').sort({created_at: 'desc'});

            return res.status(200).json({users, message: "Success"});

        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }

    async store(req, res) {
        try {
            const request = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(request.password, salt);

            const user = new User({
                name: request.name,
                email: request.email,
                password: hashed
            });

            await user.save();
            return res.status(200).json({message: "Success"});

        } catch (error) {
            return res.status(500).json({message: error.message});
        }
        
    }

    async detail(req, res) {
        const user = await User.findById('6554a1eaf59dbb43d2b426c4');

        res.status(200).json(user);
    }
}

module.exports = new UserController;
