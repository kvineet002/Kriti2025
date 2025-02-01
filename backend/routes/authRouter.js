const express = require('express');
const passport = require('../utils/passport');
const { googleCallback } = require('../controllers/userAuthController');

const router = express.Router();

// Google OAuth Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth Callback
router.get('/google/callback',googleCallback
);

module.exports = router;
