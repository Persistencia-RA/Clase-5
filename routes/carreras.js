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
