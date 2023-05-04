const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
  console.log('Esto es un mensaje para ver en consola');
  models.profesor
    .findAll({
      attributes: ['id', 'nombre', 'apellido'],
      include: [
        { as: 'aula', model: models.aula, attributes: ['id', 'numero_lab'] },
        { as: 'materia', model: models.materia, attributes: ['id', 'nombre'] },
      ],
    })
    .then((profesores) => res.send(profesores))
    .catch(() => res.sendStatus(500));
});

router.post('/', (req, res) => {
  const r = req.body;
  models.profesor
    .create({
      id_materia: r.id_materia,
      id_aula: r.id_aula,
      nombre: r.nombre,
      apellido: r.apellido,
    })
    .then((profesor) => res.status(201).send({ id: profesor.id }))
    .catch((error) => {
      if (error === 'SequelizeUniqueConstraintError: Validation error') {
        res
          .status(400)
          .send('Bad request: existe otra carrera con el mismo nombre');
      } else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`);
        res.sendStatus(500);
      }
    });
});

const findProfesor = (id, { onSuccess, onNotFound, onError }) => {
  models.profesor
    .findOne({
      attributes: ['id', 'nombre', 'apellido'],
      include: [
        { as: 'aula', model: models.aula, attributes: ['id', 'numero_lab'] },
        { as: 'materia', model: models.materia, attributes: ['id', 'nombre'] },
      ],
      where: { id },
    })
    .then((profesor) => (profesor ? onSuccess(profesor) : onNotFound()))
    .catch(() => onError());
};

router.get('/:id', (req, res) => {
  findProfesor(req.params.id, {
    onSuccess: (profesor) => res.send(profesor),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

router.put('/:id', (req, res) => {
  const r = req.body;
  const onSuccess = (profesor) =>
    profesor
      .update(
        {
          id_materia: r.id_materia,
          id_aula: r.id_aula,
          nombre: r.nombre,
          apellido: r.apellido,
        },
        { fields: ['id_materia', 'id_aula', 'nombre', 'apellido'] },
      )
      .then(() => res.sendStatus(200))
      .catch((error) => {
        if (error === 'SequelizeUniqueConstraintError: Validation error') {
          res
            .status(400)
            .send('Bad request: existe otra carrera con el mismo nombre');
        } else {
          console.log(
            `Error al intentar actualizar la base de datos: ${error}`,
          );
          res.sendStatus(500);
        }
      });
  findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

router.delete('/:id', (req, res) => {
  const onSuccess = (profesor) =>
    profesor
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

module.exports = router;
