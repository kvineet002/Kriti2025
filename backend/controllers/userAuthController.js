const { createAccessToken } = require('../handlers/jwtHandler');

const googleCallback = (req, res) => {
  const token = createAccessToken(req.user.email);
  console.log(token);
  res.redirect(`http://localhost:3000/chat?token=${token}`);
};

module.exports = { googleCallback };
