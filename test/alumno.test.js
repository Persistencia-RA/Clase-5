const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const sinon = require('sinon');
const models = require('../models');
const config = require('../config');

// Archivo de entrada de la API
const app = require('../app.js');

describe('// Test de Alumnos //', () => {
  before(() => {
    console.log(''); // Salto de línea
    config.testEnv = 'true';
  });
  describe('GETALL /alumno', () => {
    it('Debería devolver un array con todos los alumnos', async () => {
      // Crea un stub del controlador de alumnos
      const findAndCountAllStub = sinon.stub(models.alumno, 'findAndCountAll');
      const nombresEsperados = ['Juan', 'María', 'Pedro'];
      const apellidosEsperados = ['Pérez', 'Gómez', 'Rodríguez'];
      const idsEsperados = [1, 2, 3];
      // Configura el stub para devolver el mock de la respuesta esperada
      findAndCountAllStub.resolves({
        rows: [
          { id: 1, nombre: 'Juan', apellido: 'Pérez' },
          { id: 2, nombre: 'María', apellido: 'Gómez' },
          { id: 3, nombre: 'Pedro', apellido: 'Rodríguez' },
        ],
        count: 3,
      });

      // Realiza la solicitud y realiza las aserciones
      const res = await request(app).get('/alumno');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verifica si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verifica si existe la propiedad 'alumnos'
      expect(res.body).to.have.property('alumnos');
      // Verifica si 'alumnos' es un array
      expect(res.body.alumnos).to.be.an('array');
      // Verificar propiedades para cada alumno en el array
      res.body.alumnos.forEach((alumno, index) => {
        // Verifica si el alumno es un objeto
        expect(alumno).to.be.an('object');
        // Verifica si el alumno tiene la propiedad 'id'
        expect(alumno).to.have.property('id');
        // Verifica si el alumno tiene la propiedad 'nombre'
        expect(alumno).to.have.property('nombre');
        // Verifica si el alumno tiene la propiedad 'apellido'
        expect(alumno).to.have.property('apellido');
        // Verifica si  la propiedad 'nombre' del alumno es la de los mocks
        expect(alumno.nombre).to.equal(nombresEsperados[index]);
        // Verifica si  la propiedad 'apellido' del alumno es la de los mocks
        expect(alumno.apellido).to.equal(apellidosEsperados[index]);
        // Verifica si  la propiedad 'id' del alumno es la de los mocks
        expect(alumno.id).to.equal(idsEsperados[index]);
      });

      // Restaura el comportamiento original del controlador de alumnos
      findAndCountAllStub.restore();
    });
  });

  describe('POST /alumno', () => {
    it('Debería crear un nuevo alumno', async () => {
      // Crea un stub del modelo alumno
      const alumnoStub = sinon.stub(models.alumno, 'create').resolves({
        nombre: 'Lucas',
        apellido: 'Robles',
      });

      // Realiza la solicitud de creación del alumno y realiza las aserciones
      const res = await request(app).post('/alumno').send({
        nombre: 'Lucas',
        apellido: 'Robles',
      });

      // Verificar que la respuesta tenga el código 201
      expect(res.status).to.equal(201);
      // Verifica si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verificar si la respuesta contiene la propiedad 'alumno'
      expect(res.body).to.have.property('alumno');
      // Verificar si el objeto 'alumno' coincide con el valor esperado
      expect(res.body.alumno).to.deep.equal({
        nombre: 'Lucas',
        apellido: 'Robles',
      });

      // Restaura el comportamiento original del modelo alumno
      alumnoStub.restore();
    });
  });

  describe('GET /alumno/:id', () => {
    it('Debería obtener un alumno por su ID', async () => {
      // Crea un stub del método findOne del modelo Alumno
      const findOneStub = sinon.stub(models.alumno, 'findOne').resolves({
        id: 1,
        nombre: 'Julian',
        apellido: 'Salas',
      });

      // Realiza la solicitud de obtención del alumno y realiza las aserciones
      const res = await request(app).get('/alumno/1');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verificar si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verificar si el objeto coincide con el valor esperado
      expect(res.body).to.deep.equal({
        id: 1,
        nombre: 'Julian',
        apellido: 'Salas',
      });

      // Restaurar el comportamiento original del modelo Alumno
      findOneStub.restore();
    });
  });

  describe('PUT /alumno/:id', () => {
    it('Debería actualizar un alumno', async () => {
      // Crea un stub del método update del modelo Alumno
      const updateStub = sinon.stub(models.alumno, 'update').resolves([1]);

      // Crea un mock del método findOne que devuelve un alumno existente
      const findOneMock = sinon.stub(models.alumno, 'findOne').resolves({
        id: 1,
        nombre: 'Lucas',
        apellido: 'Rodriguez',
        update: updateStub, // Añade el stub de update al objeto alumno
      });

      // Realiza la solicitud de actualización del alumno y realiza las aserciones
      const res = await request(app).put('/alumno/1').send({
        nombre: 'Lucas',
        apellido: 'Gómez',
      });

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);

      // Restaurar el comportamiento original del modelo Alumno
      updateStub.restore();
      findOneMock.restore();
    });
  });

  describe('DELETE /alumno/:id', () => {
    it('Debería eliminar un alumno', async () => {
      // Crea un stub del modelo Alumno
      const destroyStub = sinon.stub(models.alumno, 'destroy').resolves(1);

      // Crea un mock del método findOne que devuelve un alumno existente
      const findOneMock = sinon.stub(models.alumno, 'findOne').resolves({
        id: 1,
        nombre: 'Lucas',
        apellido: 'Rodriguez',
        destroy: destroyStub, // Añade el stub de destroy al objeto alumno
      });

      // Realiza la solicitud de eliminación del alumno y realiza las aserciones
      const res = await request(app).delete('/alumno/1');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verificar que la respuesta tenga el mensaje esperado
      expect(res.body).to.have.property(
        'message',
        'Alumno eliminado correctamente',
      );

      // Verificar que el stub haya sido llamado una vez
      // expect(destroyStub.calledOnce).to.be.true;

      // Restaurar el comportamiento original del modelo Alumno
      destroyStub.restore();
      findOneMock.restore();
    });
  });
});
