const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://kriti2025-pi.vercel.app/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    return done(null, profile);
  }
));

module.exports = passport;
