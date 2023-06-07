const express = require('express');
const {
  signinController,
  signupController,
  getProfile,
  logout,
} = require('../controllers/authController');
const { verifyToken } = require('../libs/verifyToken');

const router = express.Router();

router.post('/signup', signupController);

router.post('/signin', signinController);

router.get('/logout', logout);

router.get('/me', verifyToken, getProfile);

module.exports = router;
