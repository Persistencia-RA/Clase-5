const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res, next) => {
  models.aula
    .findAll({
      attributes: ['id', 'numero_lab'],
    })
    .then((aula) => res.send(aula))
    .catch((error) => {
      return next(error);
    });
});

router.post('/', (req, res) => {
  models.aula
    .create({ numero_lab: req.body.numero_lab })
    .then((aula) => res.status(201).send({ id: aula.id }))
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

const findAula = (id, { onSuccess, onNotFound, onError }) => {
  models.aula
    .findOne({
      attributes: ['id', 'numero_lab'],
      where: { id },
    })
    .then((aula) => (aula ? onSuccess(aula) : onNotFound()))
    .catch(() => onError());
};

router.get('/:id', (req, res) => {
  findAula(req.params.id, {
    onSuccess: (aula) => res.send(aula),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

router.put('/:id', (req, res) => {
  const onSuccess = (aula) =>
    aula
      .update({ numero_lab: req.body.numero_lab }, { fields: ['numero_lab'] })
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
  findAula(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

router.delete('/:id', (req, res) => {
  const onSuccess = (aula) =>
    aula
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findAula(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

module.exports = router;
