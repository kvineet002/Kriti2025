const express = require('express');
const passport = require('../utils/passport');
const { googleCallback, githubCallback } = require('../controllers/userAuthController');

const router = express.Router();

// Google OAuth Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth Callback
router.get('/google/callback',
    passport.authenticate('google',{session: false}),
    googleCallback
);
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth Callback
router.get('/github/callback',
    passport.authenticate('github', { session: false }),
    githubCallback
);


module.exports = router;
