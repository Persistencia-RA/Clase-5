const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function verifyToken(req, res, next) {
  // Verificar si estamos en un entorno de prueba
  const isTesting = config.testEnv === 'true';
  if (isTesting) {
    // Si estamos en un entorno de prueba, pasar a la siguiente función sin verificar el token
    next();
  } else {
    // Obtener el token de los encabezados
    const token = req.headers['x-access-token'];

    // Si no existe un token
    if (!token) {
      return res
        .status(401)
        .json({ auth: false, message: 'No se proporcionó un token' });
    }
    // Decodificar el token
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ auth: false, message: 'Token inválido' });
      }

      // Guardar el ID del usuario decodificado en req.userId
      req.userId = decoded.id;

      // Continuar con la siguiente función
      next();
    });
  }
};

/* 
module.exports = function verifyToken(req, res, next) {
  // Obtener el token de los encabezados
  const token = req.headers['x-access-token'];

  // Si no existe un token
  if (!token) {
    return res
      .status(401)
      .json({ auth: false, message: 'No se proporcionó un token' });
  }

  // Decodificar el token
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ auth: false, message: 'Token inválido' });
    }

    // Guardar el ID del usuario decodificado en req.userId
    req.userId = decoded.id;

    // Continuar con la siguiente función
    next();
  });
};
 */
