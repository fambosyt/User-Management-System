const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Benutzerregistrierung
router.post('/register', registerUser);

// Benutzerlogin
router.post('/login', loginUser);

module.exports = router;