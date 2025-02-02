const jwt = require('jsonwebtoken');

exports.createAccessToken = (email,name,avatar) => {
    return jwt.sign(
        {email: email,name: name,avatar: avatar},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '23d'}
    );
};
