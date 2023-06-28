const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const sinon = require('sinon');
const models = require('../models');

// Archivo de entrada de la API
const app = require('../app.js');

describe('// Test de Notas //', () => {
  before(() => {
    console.log(''); // Salto de línea
  });

  describe('POST /nota', () => {
    it('Debería crear una nueva nota', async () => {
      // Crea un stub del modelo nota
      const notaStub = sinon.stub(models.nota, 'create').resolves({
        alumnoId: 25,
        materiaId: 12,
        notaPrimerParcial: 4,
        notaSegundoParcial: 6,
      });

      // Realiza la solicitud de creación de la nota y realiza las aserciones
      const res = await request(app).post('/nota').send({
        alumnoId: 25,
        materiaId: 12,
        notaPrimerParcial: 4,
        notaSegundoParcial: 6,
      });

      // Verificar que la respuesta tenga el código 201
      expect(res.status).to.equal(201);
      // Verifica si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      /// Verificar si el objeto 'nota' coincide con el valor esperado
      expect(res.body).to.deep.equal({
        alumnoId: 25,
        materiaId: 12,
        notaPrimerParcial: 4,
        notaSegundoParcial: 6,
      });

      // Restaura el comportamiento original del modelo nota
      notaStub.restore();
    });
  });

  describe('GET /nota/:id', () => {
    it('Debería obtener una nota por su ID', async () => {
      // Crea un stub del método findOne del modelo Nota
      const findOneStub = sinon.stub(models.nota, 'findOne').resolves({
        id: 3,
        notaPrimerParcial: 6,
        notaSegundoParcial: 6,
      });

      // Realiza la solicitud de obtención del nota y realiza las aserciones
      const res = await request(app).get('/nota/3');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verificar si la respuesta es un objeto
      expect(res.body).to.be.an('object');
      // Verificar si el objeto coincide con el valor esperado
      expect(res.body).to.deep.equal({
        id: 3,
        notaPrimerParcial: 6,
        notaSegundoParcial: 6,
      });

      // Restaurar el comportamiento original del modelo Nota
      findOneStub.restore();
    });
  });

  describe('PUT /nota/:id', () => {
    it('Debería actualizar una nota', async () => {
      // Crea un stub del método update del modelo Nota
      const updateStub = sinon.stub(models.nota, 'update').resolves([1]);

      // Crea un mock del método findOne que devuelve una nota existente
      const findOneMock = sinon.stub(models.nota, 'findOne').resolves({
        id: 1,
        notaPrimerParcial: 6,
        notaSegundoParcial: 6,
        update: updateStub, // Añade el stub de update al objeto nota
      });

      // Realiza la solicitud de actualización de la nota y realiza las aserciones
      const res = await request(app).put('/nota/1').send({
        id: 1,
        notaPrimerParcial: 6,
        notaSegundoParcial: 8,
      });

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);

      // Restaurar el comportamiento original del modelo Nota
      updateStub.restore();
      findOneMock.restore();
    });
  });

  describe('DELETE /nota/:id', () => {
    it('Debería eliminar un nota', async () => {
      // Crea un stub del modelo nota
      const destroyStub = sinon.stub(models.nota, 'destroy').resolves(1);

      // Crea un mock del método findOne que devuelve una nota existente
      const findOneMock = sinon.stub(models.nota, 'findOne').resolves({
        id: 1,
        notaPrimerParcial: 4,
        notaSegundoParcial: 5,
        destroy: destroyStub, // Añade el stub de destroy al objeto nota
      });

      // Realiza la solicitud de eliminación de la nota y realiza las aserciones
      const res = await request(app).delete('/nota/1');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verificar que la respuesta tenga el mensaje esperado
      expect(res.body).to.have.property(
        'message',
        'Nota eliminada correctamente',
      );

      // Verificar que el stub haya sido llamado una vez
      // expect(destroyStub.calledOnce).to.be.true;

      // Restaurar el comportamiento original del modelo Nota
      destroyStub.restore();
      findOneMock.restore();
    });
  });
});
