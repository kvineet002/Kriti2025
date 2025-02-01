const { createAccessToken } = require('../handlers/jwtHandler');

const googleCallback = (req, res) => {
    const email = req.user._json.email;
    console.log(email);
  const token = createAccessToken(req.user._json.email);
  console.log(token);
    res.cookie("token", token, {
        httpOnly: true,
    });
    const redirect_url=process.env.REDIRECT_URL;
  res.redirect(redirect_url);
};

module.exports = { googleCallback };
