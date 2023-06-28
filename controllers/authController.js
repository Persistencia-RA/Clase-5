const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { usuario } = require('../models');
const config = require('../config');

exports.signupController = async (req, res) => {
  try {
    const { nombre, contraseña } = req.body;

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    await usuario.create({
      nombre,
      contraseña: hashedPassword,
    });

    // Create a Token
    const token = jwt.sign({ nombre }, config.secret, {
      expiresIn: 60 * 60 * 24, // Expira en 24 horas
    });

    res.json({ auth: true, token });
  } catch (e) {
    console.log(e);
    res.status(500).send('Hubo un problema al registrar su usuario');
  }
};

exports.getProfile = async (req, res) => {
  const user = await usuario.findByPk(req.userId, {
    attributes: { exclude: ['contraseña'] },
  });
  if (!user) {
    return res.status(404).send('Ningun usuario encontrado.');
  }
  res.status(200).json(user);
};

exports.signinController = async (req, res) => {
  const { nombre, contraseña } = req.body;
  const user = await usuario.findOne({ where: { nombre } });
  if (!user) {
    return res.status(404).send('El usuario no existe');
  }
  const validPassword = await bcrypt.compare(contraseña, user.contraseña);
  if (!validPassword) {
    return res.status(401).send({ auth: false, token: null });
  }
  const token = jwt.sign({ nombre }, config.secret, {
    expiresIn: 60 * 60 * 24,
  });
  res.status(200).json({ auth: true, token });
};

exports.logout = async (req, res) => {
  res.status(200).send({ auth: false, token: null });
};
