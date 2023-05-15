const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
  console.log('Esto es un mensaje para ver en consola');
  models.nota
    .findAll({
      attributes: ['id', 'calificacion'],
      include: [
        { as: 'alumno', model: models.alumno, attributes: ['id', 'nombre'] },
        { as: 'materia', model: models.materia, attributes: ['id', 'nombre'] },
      ],
    })
    .then((notas) => res.send(notas))
    .catch(() => res.sendStatus(500));
});

router.post('/', (req, res) => {
  const r = req.body;
  models.nota
    .create({
      id_alumno: r.id_alumno,
      id_materia: r.id_materia,
      calificacion: r.calificacion,
    })
    .then((notas) => res.status(201).send({ id: notas.id }))
    .catch((error) => {
      if (error === 'SequelizeUniqueConstraintError: Validation error') {
        res
          .status(400)
          .send('Bad request: existe otra nota con el mismo nombre');
      } else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`);
        res.sendStatus(500);
      }
    });
});

const findNota = (id, { onSuccess, onNotFound, onError }) => {
  models.nota
    .findOne({
      attributes: ['id', 'calificacion'],
      include: [
        { as: 'alumno', model: models.aula, attributes: ['id', 'nombre'] },
        { as: 'materia', model: models.materia, attributes: ['id', 'nombre'] },
      ],
      where: { id },
    })
    .then((notas) => (notas ? onSuccess(notas) : onNotFound()))
    .catch(() => onError());
};

router.get('/:id', (req, res) => {
  findNota(req.params.id, {
    onSuccess: (nota) => res.send(nota),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

router.put('/:id', (req, res) => {
  const r = req.body;
  const onSuccess = (nota) =>
    nota
      .update(
        {
          id_alumno: r.id_alumno,
          id_materia: r.id_materia,
          calificacion: r.calificacion,
        },
        { fields: ['id_alumno', 'id_materia', 'calificacion'] },
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
  findNota(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

router.delete('/:id', (req, res) => {
  const onSuccess = (nota) =>
    nota
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findNota(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

module.exports = router;
