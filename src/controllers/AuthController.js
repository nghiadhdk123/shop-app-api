require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const Permission = require('../models/Permission');

class AuthController {
    async login(req, res) {
        try {
            const data = req.body;
            const user = await User.findOne({ 'email': data.email });

            if (!user) {
                return res.status(500).json({ 'message': 'Email hoặc mật khẩu không đúng.' })
            }
            const validPassword = await bcrypt.compare(data.password, user.password);
            if (!validPassword) {
                return res.status(500).json({ 'message': 'Email hoặc mật khẩu không đúng.' })
            }

            let permissions = [];
            if (user && validPassword) {
                const accessToken = jwt.sign({
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }, process.env.SECRET_KEY_JWT_TOKEN, { expiresIn: '365d' });

                const { password, updated_at, ...others } = user._doc;

                if (user.role_ids.length > 0) {
                    for (let roleId of user.role_ids) {
                        const role = await Role.findById(roleId);
                        if(role.permission_ids.length > 0) {
                            for(let permissionId of role.permission_ids) {
                                const permission = await Permission.findById(permissionId, 'code');
                                permissions.push(permission.code);
                            }
                        }
                    }

                    // Gộp các phần tử lặp trong mảng permissions
                    others['permissions'] = Array.from(new Set(permissions));

                } else {
                    others['permissions'] = [];
                }
                res.cookie('user', others);
                return res.status(200).json({ others, accessToken });
            }

        } catch (error) {
            return res.status(500).json({ 'error': error.message });
        }
    }

    // logout = () => {
    //     this.checkHasPermission('super-admin');
    // }

    // checkHasPermission(permissions) {
    //     console.log(permissions);
    // }
}

module.exports = new AuthController;