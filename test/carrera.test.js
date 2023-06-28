const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const sinon = require('sinon');
const models = require('../models');

// Archivo de entrada de la API
const app = require('../app.js');

describe('// Test de Carreras //', () => {
  before(() => {
    console.log(''); // Salto de línea
  });
  describe('GETALL /carrera', () => {
    it('Debería devolver un array con todas las carreras', async () => {
      // Crea un stub del controlador de carreras
      const findAndCountAllStub = sinon.stub(models.carrera, 'findAndCountAll');
      const nombresEsperados = [
        'Licenciatura en Inteligencia Artificial',
        'Ingenieria Electronica',
        'Licenciatura en Bioquímica',
      ];
      const idsEsperados = [1, 2, 3];
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
      res.body.carreras.forEach((carrera, index) => {
        // Verifica si la carrera es un objeto
        expect(carrera).to.be.an('object');
        // Verifica si la carrera tiene la propiedad 'id'
        expect(carrera).to.have.property('id');
        // Verifica si la carrera tiene la propiedad 'nombre'
        expect(carrera).to.have.property('nombre');
        // Verifica si  la propiedad 'nombre' de carrera es la de los mocks
        expect(carrera.nombre).to.equal(nombresEsperados[index]);
        // Verifica si  la propiedad 'id' de carrera es la de los mocks
        expect(carrera.id).to.equal(idsEsperados[index]);
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
      // Crea un stub del método findOne del modelo Carrera
      const findOneStub = sinon.stub(models.carrera, 'findOne').resolves({
        id: 1,
        nombre: 'Licenciatura en Manipulación de alimentos',
      });

      // Realiza la solicitud de obtención de la carrera y realiza las aserciones
      const res = await request(app).get('/carrera/1');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verificar si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verificar si el objeto coincide con el valor esperado
      expect(res.body).to.deep.equal({
        id: 1,
        nombre: 'Licenciatura en Manipulación de alimentos',
      });

      // Restaurar el comportamiento original del modelo Carrera
      findOneStub.restore();
    });
  });

  describe('PUT /carrera/:id', () => {
    it('Debería actualizar una carrera', async () => {
      // Crea un stub del método update del modelo Carrera
      const updateStub = sinon.stub(models.carrera, 'update').resolves([1]);

      // Crea un mock del método findOne que devuelve un carrera existente
      const findOneMock = sinon.stub(models.carrera, 'findOne').resolves({
        id: 1,
        nombre: 'Licenciatura en Manipulación de alimentos',
        update: updateStub, // Añade el stub de update al objeto Carrera
      });

      // Realiza la solicitud de actualización de la carrera y realiza las aserciones
      const res = await request(app).put('/carrera/1').send({
        id: 1,
        nombre: 'Licenciatura en Bromatologia',
      });

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);

      // Restaurar el comportamiento original del modelo Carrera
      updateStub.restore();
      findOneMock.restore();
    });
  });

  describe('DELETE /carrera/:id', () => {
    it('Debería eliminar una carrera', async () => {
      // Crea un stub del modelo carrera
      const destroyStub = sinon.stub(models.carrera, 'destroy').resolves(1);

      // Crea un mock del método findOne que devuelve una carrera existente
      const findOneMock = sinon.stub(models.carrera, 'findOne').resolves({
        id: 1,
        nombre: 'Licenciatura en Manipulación de alimentos',
        destroy: destroyStub, // Añade el stub de destroy al objeto carrera
      });

      // Realiza la solicitud de eliminación de la carrera y realiza las aserciones
      const res = await request(app).delete('/carrera/1');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verificar que la respuesta tenga el mensaje esperado
      expect(res.body).to.have.property(
        'message',
        'Carrera eliminada correctamente',
      );

      // Verificar que el stub haya sido llamado una vez
      // expect(destroyStub.calledOnce).to.be.true;

      // Restaurar el comportamiento original del modelo Carrera
      destroyStub.restore();
      findOneMock.restore();
    });
  });
});
