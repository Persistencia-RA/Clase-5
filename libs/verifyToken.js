const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = async function verifyToken(req, res, next) {
  // Obtener el token de los encabezados
  const token = req.headers['x-access-token'];

  // Si no existe un token
  if (!token) {
    return res
      .status(401)
      .send({ auth: false, message: 'No Token aws Provided' });
  }

  // Decodificar el token
  const decoded = await jwt.verify(token, config.secret);

  // Guardar el token en el objeto de solicitud para usarlo en las rutas
  req.userId = decoded.id;

  // Continuar con la siguiente función
  next();
};
