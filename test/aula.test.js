const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const sinon = require('sinon');
const models = require('../models');

// Importa el archivo de entrada de tu API (server.js, app.js, etc.)
const app = require('../app.js');

describe('// Test de Aulas //', () => {
  before(() => {
    console.log(''); // Salto de línea
  });
  describe('GETALL /aula', () => {
    it('Debería devolver un array con todas las aulas', async () => {
      // Crea un stub del controlador de aulas
      const findAndCountAllStub = sinon.stub(models.aula, 'findAndCountAll');

      // Configura el stub para devolver el mock de la respuesta esperada
      findAndCountAllStub.resolves({
        rows: [
          { id: 1, nroAula: 500 },
          { id: 2, nroAula: 600 },
          { id: 3, nroAula: 700 },
        ],
        count: 3,
      });

      // Realiza la solicitud y realiza las aserciones
      const res = await request(app).get('/aula');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verifica si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verifica si existe la propiedad 'aulas'
      expect(res.body).to.have.property('aulas');
      // Verifica si 'aulas' es un array
      expect(res.body.aulas).to.be.an('array');
      // Verificar propiedades para cada aula en el array
      res.body.aulas.forEach((aula) => {
        // Verifica si el aula es un objeto
        expect(aula).to.be.an('object');
        // Verifica si el alumno tiene la propiedad 'nroAula'
        expect(aula).to.have.property('id');
        // Verifica si el alumno tiene la propiedad 'nroAula'
        expect(aula).to.have.property('nroAula');
      });

      // Restaura el comportamiento original del controlador de alumnos
      findAndCountAllStub.restore();
    });
  });

  describe('POST /aula', () => {
    it('Debería crear un nuevo aula', async () => {
      // Crea un stub del modelo aula
      const aulaStub = sinon.stub(models.aula, 'create').resolves({
        id: 1,
        nroAula: 209,
      });

      // Realiza la solicitud de creación del aula y realiza las aserciones
      const res = await request(app).post('/aula').send({
        id: 1,
        nroAula: 209,
      });

      // Verificar que la respuesta tenga el código 201
      expect(res.status).to.equal(201);
      // Verifica si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verificar si la respuesta contiene la propiedad 'aula'
      expect(res.body).to.have.property('aula');
      // Verificar si el objeto 'aula' coincide con el valor esperado
      expect(res.body.aula).to.deep.equal({
        id: 1,
        nroAula: 209,
      });

      // Restaura el comportamiento original del modelo aula
      aulaStub.restore();
    });
  });

  describe('GET /aula/:id', () => {
    it('Debería obtener un aula por su ID', async () => {
      // Crea un mock del modelo aula
      const aulaMock = {
        id: 1,
        nroAula: 508,
      };

      // Crea un stub de la función 'findOne' en el modelo aula
      const findOneStub = sinon.stub(models.aula, 'findOne');

      // Configura el stub para devolver el mock de la respuesta esperada
      findOneStub.resolves(aulaMock);

      // Realiza la solicitud para obtener el aula por su ID y realiza las aserciones
      const res = await request(app).get('/aula/1');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verifica si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verificar si la respuesta coincide con el valor esperado
      expect(res.body).to.deep.equal({
        id: 1,
        nroAula: 508,
      });

      // Restaura el comportamiento original del modelo aula
      findOneStub.restore();
    });
  });
});
