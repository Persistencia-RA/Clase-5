const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentación de la API',
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'x-access-token',
        scheme: 'x-access-token',
        in: 'x-access-token',
      },
    },
  },
  apis: ['./routes/*.js'], // Ruta de los archivos de rutas de tu aplicación
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
