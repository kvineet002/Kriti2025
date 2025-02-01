const { createAccessToken } = require('../handlers/jwtHandler');

const googleCallback = (req, res) => {
    const email = req.user._json.email;
    console.log(email);
  const token = createAccessToken(req.user._json.email);
  console.log(token);
    res.cookie("token", token, {
        httpOnly: true,
    });
    
  res.redirect(`http://localhost:3000/chat`);
};

module.exports = { googleCallback };
