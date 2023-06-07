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
router.post('/registrarse', signupController);
router.post('/iniciar', signinController);
router.get('/perfil', verifyToken, getProfile);
router.get('/cerrar', logout);

module.exports = router;
