const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { usuario } = require('../models');
const config = require('../config');

// Controlador para registrar un nuevo usuario
exports.signupController = async (req, res) => {
  try {
    const { nombre, contraseña } = req.body; // Obtiene el nombre y la contraseña del cuerpo de la solicitud

    const hashedPassword = await bcrypt.hash(contraseña, 10); // Genera un hash de la contraseña usando bcrypt

    await usuario.create({
      nombre,
      contraseña: hashedPassword,
    }); // Crea un nuevo usuario en la base de datos con el nombre y la contraseña hashada

    // Crea un token JWT (JSON Web Token)
    const token = jwt.sign({ nombre }, config.secret, {
      expiresIn: 60 * 60 * 24, // Expira en 24 horas
    });

    res.json({ auth: true, token }); // Devuelve una respuesta JSON con el token generado
  } catch (e) {
    console.log(e);
    res.status(500).send('Hubo un problema al registrar su usuario'); // Devuelve un mensaje de error si ocurre un problema durante el registro
  }
};

// Controlador para obtener el perfil de un usuario autenticado
exports.getProfile = async (req, res) => {
  const user = await usuario.findByPk(req.userId, {
    attributes: { exclude: ['contraseña'] },
  }); // Busca un usuario por su identificador y excluye el campo de contraseña en los resultados

  if (!user) {
    return res.status(404).send('Ningun usuario encontrado.'); // Devuelve un mensaje de error si no se encuentra ningún usuario
  }

  res.status(200).json(user); // Devuelve los detalles del usuario en formato JSON
};

// Controlador para iniciar sesión de un usuario
exports.signinController = async (req, res) => {
  const { nombre, contraseña } = req.body; // Obtiene el nombre y la contraseña del cuerpo de la solicitud

  const user = await usuario.findOne({ where: { nombre } }); // Busca un usuario por su nombre

  if (!user) {
    return res.status(404).send('El usuario no existe'); // Devuelve un mensaje de error si el usuario no existe
  }

  const validPassword = await bcrypt.compare(contraseña, user.contraseña); // Compara la contraseña proporcionada con la contraseña hashada almacenada en la base de datos

  if (!validPassword) {
    return res.status(401).send({ auth: false, token: null }); // Devuelve un mensaje de error si la contraseña no es válida
  }

  const token = jwt.sign({ nombre }, config.secret, {
    expiresIn: 60 * 60 * 24, // Crea un nuevo token JWT válido por 24 horas
  });

  res.status(200).json({ auth: true, token }); // Devuelve una respuesta JSON con el token generado
};

// Controlador para cerrar sesión de un usuario
exports.logout = async (req, res) => {
  res.status(200).send({ auth: false, token: null }); // Devuelve una respuesta JSON indicando que el usuario ha cerrado sesión
};
