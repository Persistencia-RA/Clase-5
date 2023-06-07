const express = require('express');
const router = express.Router();
const {
  signupController,
  getProfile,
  signinController,
  logout,
} = require('../controllers/authController');
const verifyToken = require('../libs/verifyToken');

// Rutas de autenticación
router.post('/signup', signupController);
router.post('/signin', signinController);
router.get('/profile', verifyToken, getProfile);
router.get('/logout', logout);

module.exports = router;
