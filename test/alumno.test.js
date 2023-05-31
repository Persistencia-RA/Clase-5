const chai = require('chai');
const expect = chai.expect;
const axios = require('axios');
const sinon = require('sinon');

// Crea una instancia de Axios con la URL base de tu servidor
const api = axios.create({
  baseURL: 'http://localhost:3001',
});

describe('API de Alumnos', () => {
  describe('GETALL /alumno', () => {
    it('Debería devolver un array con todos los alumnos', async () => {
      // Crea un mock de la respuesta esperada
      const mockResponse = {
        alumnos: [
          { nombre: 'Juan', apellido: 'Pérez' },
          { nombre: 'María', apellido: 'Gómez' },
          { nombre: 'Pedro', apellido: 'Rodríguez' },
        ],
      };

      // Crea un stub de la función 'get' en axios
      const getStub = sinon.stub(axios, 'get').resolves({ data: mockResponse });

      // Realiza la solicitud y realiza las aserciones
      const res = await api.get('/alumno');

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verifica si la respuesta es un objeto
      expect(res.data).to.be.an('object');
      // Verifica si existe la propiedad 'alumnos'
      expect(res.data).to.have.property('alumnos');
      // Verifica si 'alumnos' es un array
      expect(res.data.alumnos).to.be.an('array');
      // Verificar propiedades para cada alumno en el array
      res.data.alumnos.forEach((alumno) => {
        // Verifica si el alumno es un objeto
        expect(alumno).to.be.an('object');
        // Verifica si el alumno tiene la propiedad 'nombre'
        expect(alumno).to.have.property('nombre');
        // Verifica si el alumno tiene la propiedad 'apellido'
        expect(alumno).to.have.property('apellido');
      });

      // Restaura el comportamiento original de la función 'get'
      getStub.restore();
    });
  });

  describe('POST /alumno', () => {
    it('Debería crear un nuevo alumno', async () => {
      // Crea un mock de la respuesta esperada
      const mockResponse = {
        alumno: { nombre: 'Juan', apellido: 'Pérez' },
      };

      // Crea un stub de la función 'post' en axios
      const postStub = sinon
        .stub(axios, 'post')
        .resolves({ data: mockResponse });

      // Datos del nuevo alumno
      const nuevoAlumno = { nombre: 'Juan', apellido: 'Pérez' };

      // Realiza la solicitud de creación del alumno y realiza las aserciones
      const res = await api.post('/alumno', nuevoAlumno);

      // Verificar que la respuesta tenga el código 201
      expect(res.status).to.equal(201);
      // Verifica si la respuesta es un objeto
      expect(res.data).to.be.an('object');
      // Verificar si la respuesta contiene la propiedad 'alumno'
      expect(res.data).to.have.property('alumno');
      // Verificar si el objeto 'alumno' coincide con el valor esperado
      expect(res.data.alumno).to.deep.equal({
        nombre: 'Juan',
        apellido: 'Pérez',
      });

      // Restaura el comportamiento original de la función 'post'
      postStub.restore();
    });
  });

  describe('GET /alumno/:id', () => {
    it('Debería obtener un alumno por su ID', async () => {
      // Crea un mock de la respuesta esperada
      const mockAlumno = {
        id: 1,
        nombre: 'Juan',
        apellido: 'Pérez',
        carrera: {
          nombre: 'Ingeniería en Sistemas',
        },
        materia: [
          {
            id: 1,
            nombre: 'Programación I',
            nota: {
              notaPrimerParcial: 8,
              notaSegundoParcial: 7,
            },
          },
          {
            id: 2,
            nombre: 'Base de Datos',
            nota: {
              notaPrimerParcial: 5,
              notaSegundoParcial: 7,
            },
          },
          {
            id: 3,
            nombre: 'Organización de computadoras',
            nota: {
              notaPrimerParcial: 8,
              notaSegundoParcial: 7,
            },
          },
        ],
      };

      // Crea un stub de la función 'get' en axios
      const getStub = sinon.stub(axios, 'get').resolves({ data: mockAlumno });

      // ID del alumno a consultar
      const alumnoId = 1;

      // Realiza la solicitud de obtención del alumno por ID y realiza las aserciones
      const res = await api.get(`/alumno/${alumnoId}`);

      // Verificar que la respuesta tenga el código 200
      expect(res.status).to.equal(200);
      // Verifica si la respuesta es un objeto
      expect(res.data).to.be.an('object');
      // Verificar si la respuesta coincide con el alumno esperado
      expect(res.data).to.deep.equal({
        id: mockAlumno.id,
        nombre: mockAlumno.nombre,
        apellido: mockAlumno.apellido,
        carrera: mockAlumno.carrera,
        materia: mockAlumno.materia,
      });

      // Restaura el comportamiento original de la función 'get'
      getStub.restore();
    });
  });
});
