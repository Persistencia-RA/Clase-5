const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /carrera:
 *   get:
 *     summary: Obtiene todas las carreras
 *     tags:
 *       - Carreras
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
 *                     description: ID de la carrera
 *                   nombre:
 *                     type: string
 *                     description: Nombre de la carrera
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', (req, res) => {
  console.log('Esto es un mensaje para ver en consola');
  models.carrera
    .findAll({
      attributes: ['id', 'nombre'],
    })
    .then((carreras) => res.send(carreras))
    .catch(() => res.sendStatus(500));
});

/**
 * @swagger
 * /carrera:
 *   post:
 *     summary: Crea una nueva carrera
 *     tags: [Carreras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la carrera
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la carrera creada
 *       400:
 *         description: Solicitud incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', (req, res) => {
  models.carrera
    .create({ nombre: req.body.nombre })
    .then((carrera) => res.status(201).send({ id: carrera.id }))
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

/**
 * @swagger
 * /carrera/{id}:
 *   get:
 *     summary: Obtiene una carrera por su ID
 *     tags:
 *       - Carreras
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *                   description: ID de la carrera
 *                 nombre:
 *                   type: string
 *                   description: Nombre de la carrera
 *       404:
 *         description: Carrera no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', (req, res) => {
  findCarrera(req.params.id, {
    onSuccess: (carrera) => res.send(carrera),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

/**
 * @swagger
 * /carrera/{id}:
 *   put:
 *     summary: Actualiza una carrera por su ID
 *     tags: [Carreras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: body
 *         name: body
 *         description: Datos de la carrera a actualizar
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *               description: Nuevo nombre de la carrera
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Solicitud incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *       404:
 *         description: Carrera no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', (req, res) => {
  const onSuccess = (carrera) =>
    carrera
      .update({ nombre: req.body.nombre }, { fields: ['nombre'] })
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
  findCarrera(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

/**
 * @swagger
 * /carrera/{id}:
 *   delete:
 *     summary: Elimina una carrera por su ID
 *     tags: [Carreras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Carrera no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', (req, res) => {
  const onSuccess = (carrera) =>
    carrera
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findCarrera(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

const findCarrera = (id, { onSuccess, onNotFound, onError }) => {
  models.carrera
    .findOne({
      attributes: ['id', 'nombre'],
      where: { id },
    })
    .then((carrera) => (carrera ? onSuccess(carrera) : onNotFound()))
    .catch(() => onError());
};

module.exports = router;
