const jwt = require('jsonwebtoken');

exports.createAccessToken = email => {
    return jwt.sign(
        {email: email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '23d'}
    );
};
