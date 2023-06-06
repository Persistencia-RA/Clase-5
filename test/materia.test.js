const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const sinon = require('sinon');
const models = require('../models');

// Archivo de entrada de la API
const app = require('../app.js');

describe('// Test de Materias //', () => {
  before(() => {
    console.log(''); // Salto de línea
  });
  describe('GETALL /materia', () => {
    it('Debería devolver un array con todas las materias', async () => {
      // Crea un stub del controlador de materias
      const findAndCountAllStub = sinon.stub(models.materia, 'findAndCountAll');
      const nombresEsperados = [
        'Programación funcional',
        'Ingenieria de requerimientos',
        'Construcción de Interfaces de Usuario',
      ];
      const idsEsperados = [1, 2, 3];
      // Configura el stub para devolver el mock de la respuesta esperada
      findAndCountAllStub.resolves({
        rows: [
          { id: 1, nombre: 'Programación funcional' },
          { id: 2, nombre: 'Ingenieria de requerimientos' },
          { id: 3, nombre: 'Construcción de Interfaces de Usuario' },
        ],
        count: 3,
      });

      // Realiza la solicitud y realiza las aserciones
      const res = await request(app).get('/materia');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verifica si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verifica si existe la propiedad 'materias'
      expect(res.body).to.have.property('materias');
      // Verifica si 'materias' es un array
      expect(res.body.materias).to.be.an('array');
      // Verificar propiedades para cada materias en el array
      res.body.materias.forEach((materia, index) => {
        // Verifica si la materia es un objeto
        expect(materia).to.be.an('object');
        // Verifica si la carmateriarera tiene la propiedad 'id'
        expect(materia).to.have.property('id');
        // Verifica si la materia tiene la propiedad 'nombre'
        expect(materia).to.have.property('nombre');
        // Verifica si  la propiedad 'nombre' de materia es la de los mocks
        expect(materia.nombre).to.equal(nombresEsperados[index]);
        // Verifica si  la propiedad 'id' de materia es la de los mocks
        expect(materia.id).to.equal(idsEsperados[index]);
      });

      // Restaura el comportamiento original del controlador de materias
      findAndCountAllStub.restore();
    });
  });

  describe('POST /materia', () => {
    it('Debería crear una nueva materia', async () => {
      // Crea un stub del modelo materia
      const materiaStub = sinon.stub(models.materia, 'create').resolves({
        id: 8,
        nombre: 'Laboratorio de Redes',
      });

      // Realiza la solicitud de creación de la materia y realiza las aserciones
      const res = await request(app).post('/materia').send({
        id: 8,
        nombre: 'Laboratorio de Redes',
      });

      // Verificar que la respuesta tenga el código 201
      expect(res.status).to.equal(201);
      // Verifica si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verificar si la respuesta contiene la propiedad 'materia'
      expect(res.body).to.have.property('materia');
      // Verificar si el objeto 'materia' coincide con el valor esperado
      expect(res.body.materia).to.deep.equal({
        id: 8,
        nombre: 'Laboratorio de Redes',
      });

      // Restaura el comportamiento original del modelo materia
      materiaStub.restore();
    });
  });

  describe('GET /materia/:id', () => {
    it('Debería obtener una materia por su ID', async () => {
      // Crea un stub del método findOne del modelo Materia
      const findOneStub = sinon.stub(models.materia, 'findOne').resolves({
        id: 1,
        nombre: 'Diseño de Algoritmos',
      });

      // Realiza la solicitud de obtención de la materia y realiza las aserciones
      const res = await request(app).get('/materia/1');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verificar si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verificar si el objeto coincide con el valor esperado
      expect(res.body).to.deep.equal({
        id: 1,
        nombre: 'Diseño de Algoritmos',
      });

      // Restaurar el comportamiento original del modelo Materia
      findOneStub.restore();
    });
  });

  describe('PUT /materia/:id', () => {
    it('Debería actualizar una materia', async () => {
      // Crea un stub del método update del modelo Materia
      const updateStub = sinon.stub(models.materia, 'update').resolves([1]);

      // Crea un mock del método findOne que devuelve un materia existente
      const findOneMock = sinon.stub(models.materia, 'findOne').resolves({
        id: 3,
        nombre: 'Programación con Objetos I',
        update: updateStub, // Añade el stub de update al objeto Materia
      });

      // Realiza la solicitud de actualización de la materia y realiza las aserciones
      const res = await request(app).put('/materia/3').send({
        id: 3,
        nombre: 'Programación con Objetos I',
      });

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);

      // Restaurar el comportamiento original del modelo Materia
      updateStub.restore();
      findOneMock.restore();
    });
  });

  describe('DELETE /materia/:id', () => {
    it('Debería eliminar una materia', async () => {
      // Crea un stub del modelo materia
      const destroyStub = sinon.stub(models.materia, 'destroy').resolves(1);

      // Crea un mock del método findOne que devuelve una materia existente
      const findOneMock = sinon.stub(models.materia, 'findOne').resolves({
        id: 4,
        nombre: 'Desarrollo de Aplicaciones',
        destroy: destroyStub, // Añade el stub de destroy al objeto materia
      });

      // Realiza la solicitud de eliminación de la materia y realiza las aserciones
      const res = await request(app).delete('/materia/4');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verificar que la respuesta tenga el mensaje esperado
      expect(res.body).to.have.property(
        'message',
        'Materia eliminada correctamente',
      );

      // Verificar que el stub haya sido llamado una vez
      // expect(destroyStub.calledOnce).to.be.true;

      // Restaurar el comportamiento original del modelo Materia
      destroyStub.restore();
      findOneMock.restore();
    });
  });
});
