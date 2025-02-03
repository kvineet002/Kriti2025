const jwt = require('jsonwebtoken');
const Chat = require('../models/chat');
exports.checkAuth = async (req, res, next) => {
    const authorization = req.headers['authorization'];
    if(!authorization) {
        return next(('Access Token is not passed.'));
    }

    const token = authorization.split(' ')[1];
    if(token == null) {
        return next(ne('Access Token is not passed.'));
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,  (err, user) => {
        if (err) {
            return res.status(403).send("Invalid Token");
        }
        next();
    });
};