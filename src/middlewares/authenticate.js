require('dotenv').config();
const jwt = require('jsonwebtoken');
function auth(req, res, next) {
    const token = req.headers['authorization'];
    if(token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.SECRET_KEY_JWT_TOKEN, (err, user) => {
            if(err) {
                return res.status(401).json({err: "Unauthorized"});
            }
            return next();
        });
    }else {
        return res.status(401).json({err: "Unauthorized "});
    }
}

module.exports = auth;