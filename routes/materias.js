const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res, next) => {
  models.materia
    .findAll({
      attributes: ['id', 'nombre'],
      include: [
        { as: 'carrera', model: models.carrera, attributes: ['id', 'nombre'] },
      ],
    })
    .then((materia) => res.send(materia))
    .catch((error) => {
      return next(error);
    });
});

router.post('/', (req, res) => {
  models.materia
    .create({ id_carrera: req.body.id_carrera, nombre: req.body.nombre })
    .then((materia) => res.status(201).send({ id: materia.id }))
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

const findMateria = (id, { onSuccess, onNotFound, onError }) => {
  models.materia
    .findOne({
      attributes: ['id', 'id_carrera', 'nombre'],
      include: [
        { as: 'carrera', model: models.carrera, attributes: ['id', 'nombre'] },
      ],
      where: { id },
    })
    .then((materia) => (materia ? onSuccess(materia) : onNotFound()))
    .catch(() => onError());
};

router.get('/:id', (req, res) => {
  findMateria(req.params.id, {
    onSuccess: (materia) => res.send(materia),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

router.put('/:id', (req, res) => {
  const onSuccess = (materia) =>
    materia
      .update({ nombre: req.body.nombre }, { fields: ['nombre'] })
      .then(() => res.sendStatus(200))
      .catch((error) => {
        if (error === 'SequelizeUniqueConstraintError: Validation error') {
          res
            .status(400)
            .send('Bad request: existe otra materia con el mismo nombre');
        } else {
          console.log(
            `Error al intentar actualizar la base de datos: ${error}`,
          );
          res.sendStatus(500);
        }
      });
  findMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

router.delete('/:id', (req, res) => {
  const onSuccess = (materia) =>
    materia
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

module.exports = router;
