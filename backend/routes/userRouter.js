const express = require('express');
const { createUser, getUser } = require('../controllers/userController');
const router = express.Router();

router.post('/create',createUser);
router.get('/get/:email',getUser);

module.exports = router;