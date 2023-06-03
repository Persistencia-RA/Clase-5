const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const sinon = require('sinon');
const models = require('../models');
// const alumno = require('../routes/alumnos');

// Importa el archivo de entrada de tu API (server.js, app.js, etc.)
const app = require('../app.js');

describe('// Test de Alumnos //', () => {
  before(() => {
    console.log(''); // Salto de línea
  });
  describe('GETALL /alumno', () => {
    it('Debería devolver un array con todos los alumnos', async () => {
      // Crea un stub del controlador de alumnos
      const findAndCountAllStub = sinon.stub(models.alumno, 'findAndCountAll');

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
      res.body.alumnos.forEach((alumno) => {
        // Verifica si el alumno es un objeto
        expect(alumno).to.be.an('object');
        // Verifica si el alumno tiene la propiedad 'id'
        expect(alumno).to.have.property('id');
        // Verifica si el alumno tiene la propiedad 'nombre'
        expect(alumno).to.have.property('nombre');
        // Verifica si el alumno tiene la propiedad 'apellido'
        expect(alumno).to.have.property('apellido');
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
      // Crea un mock del modelo alumno
      const alumnoMock = {
        id: 1,
        nombre: 'Juan',
        apellido: 'Pablo',
      };

      // Crea un stub de la función 'findOne' en el modelo alumno
      const findOneStub = sinon.stub(models.alumno, 'findOne');

      // Configura el stub para devolver el mock de la respuesta esperada
      findOneStub.resolves(alumnoMock);

      // Realiza la solicitud para obtener el alumno por su ID y realiza las aserciones
      const res = await request(app).get('/alumno/1');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verifica si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verificar si la respuesta coincide con el valor esperado
      expect(res.body).to.deep.equal({
        id: 1,
        nombre: 'Juan',
        apellido: 'Pablo',
      });

      // Restaura el comportamiento original del modelo alumno
      findOneStub.restore();
    });
  });

  /*   describe('PUT /alumno/:id', () => {
    it('Debería actualizar un alumno por su ID', async () => {
      // Mock del alumno existente en la base de datos
      const alumnoMock = {
        id: 1,
        nombre: 'Juan',
        apellido: 'Pablo',
      };

      // Stub de la función 'findOne' en el modelo alumno
      const findOneStub = sinon.stub(models.alumno, 'findOne');
      // Stub del método 'update' en el prototipo del modelo alumno
      const updateStub = sinon.stub(models.alumno.prototype, 'update');

      // Configurar el stub para que devuelva el mock del alumno encontrado
      findOneStub.resolves(alumnoMock);
      // Configurar el stub para que devuelva el número de filas afectadas [1] indicando que se realizó la actualización correctamente
      updateStub.resolves();

      // Realizar la solicitud de actualización del alumno y realizar las aserciones
      const res = await request(app).put('/alumno/1').send({
        nombre: 'Juan',
        apellido: 'Pablo',
      });

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);

      // Restaurar el comportamiento original de la función 'findOne' y el método 'update'
      findOneStub.restore();
      updateStub.restore();
    });
  }); */

  /* describe('DELETE /alumno/:id', () => {
    it('Debería eliminar un alumno por su ID', async () => {
      // Crea un objeto mock de alumno con los datos del alumno a eliminar
      const alumnoMock = {
        id: 1,
        nombre: 'Juan',
        apellido: 'Pablo',
        // Crea un stub para el método 'destroy' del alumno que resuelve sin hacer nada
        destroy: sinon.stub().resolves(),
      };

      // Stub del método 'findOne' en el modelo alumno para devolver el objeto alumnoMock
      const findOneStub = sinon.stub(models.alumno, 'findOne');
      findOneStub.withArgs({ where: { id: 1 } }).resolves(alumnoMock);

      // Realiza la solicitud para eliminar el alumno por su ID y realiza las aserciones
      const res = await request(app).delete('/alumno/1');

      // Verifica que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verifica si la respuesta contiene el mensaje esperado
      expect(res.text).to.equal('Alumno eliminado con éxito');

      // Restaura el comportamiento original del método 'findOne' en el modelo alumno
      findOneStub.restore();
    });
  }); */
});
