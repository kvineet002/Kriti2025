const { createAccessToken } = require("../handlers/jwtHandler");
const User = require("../models/user");

const googleCallback = async (req, res) => {
  const name = req.user._json.given_name + " " + req.user._json.family_name;
  const email = req.user._json.email;
  const avatar = req.user._json.picture;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      const user = new User({
        name: name,
        email: email,
        avatar: avatar,
      });
      await user.save();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user!");
  }
  const redirect_url = process.env.REDIRECT_URL;
  const token = createAccessToken(email, name, avatar);
  res.redirect(
    `${redirect_url}/?token=${token}&email=${email}&name=${name}&avatar=${avatar}`
  );
  
};

module.exports = { googleCallback };
