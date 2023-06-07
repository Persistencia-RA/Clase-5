const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Persistencia',
      version: '3.0.0',
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
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
