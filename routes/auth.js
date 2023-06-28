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

/**
 * @swagger
 * /login/iniciar:
 *   post:
 *     summary: Iniciar secion
 *     tags:
 *       - Iniciar secion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                nombre:
 *                 type: string
 *                 description: nombre de usuario
 *                contraseña:
 *                 type: string
 *                 description: contraseña
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: ID del aula creado
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJWYWxlbnRpbm9DaGFwIiwiaWF0IjoxNjg2MTYyMzE1LCJleHAiOjE2ODYyNDg3MTV9.3kUn85JMJ5rkND4sRIYgfeHgk_n7JtubL4pbgCwLpeY
 */
router.post('/iniciar', signinController);
router.get('/perfil', verifyToken, getProfile);
router.get('/cerrar', logout);

module.exports = router;
