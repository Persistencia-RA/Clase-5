const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /aula:
 *   get:
 *     summary: Obtiene todas las aulas
 *     tags:
 *       - Aulas
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del aula
 *                   numero_lab:
 *                     type: string
 *                     description: Número de laboratorio del aula
 *       500:
 *         description: Error interno del servidor
 */
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

/**
 * @swagger
 * /aula:
 *   post:
 *     summary: Crea una nueva aula
 *     tags:
 *       - Aulas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_lab:
 *                 type: string
 *                 description: Número de laboratorio del aula
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del aula creado
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Error interno del servidor
 */
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

/**
 * @swagger
 * /aula/{id}:
 *   get:
 *     summary: Obtiene un aula por ID
 *     tags:
 *       - Aulas
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del aula a obtener
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del aula
 *                 numero_lab:
 *                   type: string
 *                   description: Número de laboratorio del aula
 *       404:
 *         description: Aula no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', (req, res) => {
  findAula(req.params.id, {
    onSuccess: (aula) => res.send(aula),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

/**
 * @swagger
 * /aula/{id}:
 *   put:
 *     summary: Actualiza un aula por ID
 *     tags:
 *       - Aulas
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del aula a actualizar
 *         required: true
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_lab:
 *                 type: string
 *                 description: Número de laboratorio del aula
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Aula no encontrada
 *       500:
 *         description: Error interno del servidor
 */
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

/**
 * @swagger
 * /aula/{id}:
 *   delete:
 *     summary: Elimina un aula por ID
 *     tags:
 *       - Aulas
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del aula a eliminar
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Aula no encontrada
 *       500:
 *         description: Error interno del servidor
 */
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
