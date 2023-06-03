const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const sinon = require('sinon');
const models = require('../models');

// Importa el archivo de entrada de tu API (server.js, app.js, etc.)
const app = require('../app.js');

describe('// Test de Carreras //', () => {
  before(() => {
    console.log(''); // Salto de línea
  });
  describe('GETALL /carrera', () => {
    it('Debería devolver un array con todas las carreras', async () => {
      // Crea un stub del controlador de carreras
      const findAndCountAllStub = sinon.stub(models.carrera, 'findAndCountAll');

      // Configura el stub para devolver el mock de la respuesta esperada
      findAndCountAllStub.resolves({
        rows: [
          { id: 1, nombre: 'Licenciatura en Inteligencia Artificial' },
          { id: 2, nombre: 'Ingenieria Electronica' },
          { id: 3, nombre: 'Licenciatura en Bioquímica' },
        ],
        count: 3,
      });

      // Realiza la solicitud y realiza las aserciones
      const res = await request(app).get('/carrera');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verifica si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verifica si existe la propiedad 'carreras'
      expect(res.body).to.have.property('carreras');
      // Verifica si 'carreras' es un array
      expect(res.body.carreras).to.be.an('array');
      // Verificar propiedades para cada carreras en el array
      res.body.carreras.forEach((carrera) => {
        // Verifica si el carrera es un objeto
        expect(carrera).to.be.an('object');
        // Verifica si la carrera tiene la propiedad 'id'
        expect(carrera).to.have.property('id');
        // Verifica si la carrera tiene la propiedad 'nombre'
        expect(carrera).to.have.property('nombre');
      });

      // Restaura el comportamiento original del controlador de carreras
      findAndCountAllStub.restore();
    });
  });

  describe('POST /carrera', () => {
    it('Debería crear una nueva carrera', async () => {
      // Crea un stub del modelo carrera
      const carreraStub = sinon.stub(models.carrera, 'create').resolves({
        id: 1,
        nombre: 'Licenciatura en Manipulación de alimentos',
      });

      // Realiza la solicitud de creación de la carrera y realiza las aserciones
      const res = await request(app).post('/carrera').send({
        id: 1,
        nombre: 'Licenciatura en Manipulación de alimentos',
      });

      // Verificar que la respuesta tenga el código 201
      expect(res.status).to.equal(201);
      // Verifica si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verificar si la respuesta contiene la propiedad 'carrera'
      expect(res.body).to.have.property('carrera');
      // Verificar si el objeto 'carrera' coincide con el valor esperado
      expect(res.body.carrera).to.deep.equal({
        id: 1,
        nombre: 'Licenciatura en Manipulación de alimentos',
      });

      // Restaura el comportamiento original del modelo carrera
      carreraStub.restore();
    });
  });

  describe('GET /carrera/:id', () => {
    it('Debería obtener una carrera por su ID', async () => {
      // Crea un mock del modelo carrera
      const carreraMock = {
        id: 1,
        nombre: 'Licenciatura en Redes Informáticas',
      };

      // Crea un stub de la función 'findOne' en el modelo carrera
      const findOneStub = sinon.stub(models.carrera, 'findOne');

      // Configura el stub para devolver el mock de la respuesta esperada
      findOneStub.resolves(carreraMock);

      // Realiza la solicitud para obtener la carrera por su ID y realiza las aserciones
      const res = await request(app).get('/carrera/1');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verifica si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verificar si la respuesta coincide con el valor esperado
      expect(res.body).to.deep.equal({
        id: 1,
        nombre: 'Licenciatura en Redes Informáticas',
      });

      // Restaura el comportamiento original del modelo carrera
      findOneStub.restore();
    });
  });
});
