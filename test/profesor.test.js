const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const sinon = require('sinon');
const models = require('../models');

// Archivo de entrada de la API
const app = require('../app.js');

describe('// Test de Profesores //', () => {
  before(() => {
    console.log(''); // Salto de línea
  });
  describe('GETALL /profesor', () => {
    it('Debería devolver un array con todos los profesores', async () => {
      // Crea un stub del controlador de profesores
      const findAndCountAllStub = sinon.stub(
        models.profesor,
        'findAndCountAll',
      );
      const nombresEsperados = ['Anibal', 'Soledad', 'Gabriel'];
      const apellidosEsperados = ['Ramirez', 'Sosa', 'Monte'];
      const idsEsperados = [1, 2, 3];
      // Configura el stub para devolver el mock de la respuesta esperada
      findAndCountAllStub.resolves({
        rows: [
          { id: 1, nombre: 'Anibal', apellido: 'Ramirez' },
          { id: 2, nombre: 'Soledad', apellido: 'Sosa' },
          { id: 3, nombre: 'Gabriel', apellido: 'Monte' },
        ],
        count: 3,
      });

      // Realiza la solicitud y realiza las aserciones
      const res = await request(app).get('/profesor');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verifica si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verifica si existe la propiedad 'profesores'
      expect(res.body).to.have.property('profesores');
      // Verifica si 'profesores' es un array
      expect(res.body.profesores).to.be.an('array');
      // Verificar propiedades para cada profesor en el array
      res.body.profesores.forEach((profesor, index) => {
        // Verifica si el profesor es un objeto
        expect(profesor).to.be.an('object');
        // Verifica si el profesor tiene la propiedad 'id'
        expect(profesor).to.have.property('id');
        // Verifica si el profesor tiene la propiedad 'nombre'
        expect(profesor).to.have.property('nombre');
        // Verifica si el profesor tiene la propiedad 'apellido'
        expect(profesor).to.have.property('apellido');
        // Verifica si la propiedad 'profesor' del profesor es la de los mocks
        expect(profesor.nombre).to.equal(nombresEsperados[index]);
        // Verifica si la propiedad 'apellido' del profesor es la de los mocks
        expect(profesor.apellido).to.equal(apellidosEsperados[index]);
        // Verifica si la propiedad 'id' del profesor es la de los mocks
        expect(profesor.id).to.equal(idsEsperados[index]);
      });

      // Restaura el comportamiento original del controlador de profesores
      findAndCountAllStub.restore();
    });
  });

  describe('POST /profesor', () => {
    it('Debería crear un nuevo profesor', async () => {
      // Crea un stub del modelo profesor
      const profesorStub = sinon.stub(models.profesor, 'create').resolves({
        nombre: 'Alexis',
        apellido: 'Pereyra',
      });

      // Realiza la solicitud de creación del profesor y realiza las aserciones
      const res = await request(app).post('/profesor').send({
        nombre: 'Alexis',
        apellido: 'Pereyra',
      });

      // Verificar que la respuesta tenga el código 201
      expect(res.status).to.equal(201);
      // Verifica si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verificar si la respuesta contiene la propiedad 'profesor'
      expect(res.body).to.have.property('profesor');
      // Verificar si el objeto 'profesor' coincide con el valor esperado
      expect(res.body.profesor).to.deep.equal({
        nombre: 'Alexis',
        apellido: 'Pereyra',
      });

      // Restaura el comportamiento original del modelo Profesor
      profesorStub.restore();
    });
  });

  describe('GET /profesor/:id', () => {
    it('Debería obtener un profesor por su ID', async () => {
      // Crea un stub del método findOne del modelo Profesor
      const findOneStub = sinon.stub(models.profesor, 'findOne').resolves({
        id: 1,
        nombre: 'Daniel',
        apellido: 'Salas',
      });

      // Realiza la solicitud de obtención del profesor y realiza las aserciones
      const res = await request(app).get('/profesor/1');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verificar si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verificar si el objeto coincide con el valor esperado
      expect(res.body).to.deep.equal({
        id: 1,
        nombre: 'Daniel',
        apellido: 'Salas',
      });

      // Restaurar el comportamiento original del modelo Profesor
      findOneStub.restore();
    });
  });

  describe('PUT /profesor/:id', () => {
    it('Debería actualizar un profesor', async () => {
      // Crea un stub del método update del modelo Profesor
      const updateStub = sinon.stub(models.profesor, 'update').resolves([1]);

      // Crea un mock del método findOne que devuelve un profesor existente
      const findOneMock = sinon.stub(models.profesor, 'findOne').resolves({
        id: 1,
        nombre: 'Lucas',
        apellido: 'Rodriguez',
        update: updateStub, // Añade el stub de update al objeto profesor
      });

      // Realiza la solicitud de actualización del profesor y realiza las aserciones
      const res = await request(app).put('/profesor/1').send({
        nombre: 'Lucas',
        apellido: 'Gómez',
      });

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);

      // Restaurar el comportamiento original del modelo Profesor
      updateStub.restore();
      findOneMock.restore();
    });
  });

  describe('DELETE /profesor/:id', () => {
    it('Debería eliminar un profesor', async () => {
      // Crea un stub del modelo profesor
      const destroyStub = sinon.stub(models.profesor, 'destroy').resolves(1);

      // Crea un mock del método findOne que devuelve un profesor existente
      const findOneMock = sinon.stub(models.profesor, 'findOne').resolves({
        id: 1,
        nombre: 'Lucas',
        apellido: 'Rodriguez',
        destroy: destroyStub, // Añade el stub de destroy al objeto profesor
      });

      // Realiza la solicitud de eliminación del profesor y realiza las aserciones
      const res = await request(app).delete('/profesor/1');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verificar que la respuesta tenga el mensaje esperado
      expect(res.body).to.have.property(
        'message',
        'Profesor eliminado correctamente',
      );

      // Verificar que el stub haya sido llamado una vez
      // expect(destroyStub.calledOnce).to.be.true;

      // Restaurar el comportamiento original del modelo Alumno
      destroyStub.restore();
      findOneMock.restore();
    });
  });
});
