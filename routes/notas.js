const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /Nota:
 *   post:
 *     summary: Crea una nueva Nota
 *     tags: [Nota]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alumnoId:
 *                 type: integer
 *                 description: id del alumno
 *               materiaId:
 *                 type: integer
 *                 description: id de la materia
 *               notaPrimerParcial:
 *                 type: integer
 *                 description: nota del notaPrimerParcial
 *               notaSegundoParcial:
 *                 type: integer
 *                 description: nota del notaSegundoParcial
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
 *                   description: ID de la nota
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
  const { alumnoId, materiaId, notaPrimerParcial, notaSegundoParcial } =
    req.body;

  models.nota
    .create({ alumnoId, materiaId, notaPrimerParcial, notaSegundoParcial })
    .then((nota) => {
      res.status(201).json(nota);
    })
    .catch((err) => {
      console.error('Error al crear la nota:', err);
      res.status(500).json({ error: 'Error al crear la nota' });
    });
});

/**
 * @swagger
 * /Nota/{id}:
 *   get:
 *     summary: Obtiene una Nota por su ID
 *     tags:
 *       - Nota
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
 *               alumnoId:
 *                 type: integer
 *                 description: id del alumno
 *               materiaId:
 *                 type: integer
 *                 description: id de la materia
 *               notaPrimerParcial:
 *                 type: integer
 *                 description: nota de la primer nota
 *               notaSegundoParcial:
 *                 type: integer
 *                 description: nota de la segunda nota
 *       404:
 *         description: Materia no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', (req, res) => {
  const notaId = req.params.id;
  models.nota
    .findOne({
      attributes: [
        'alumnoId',
        'materiaId',
        'notaPrimerParcial',
        'notaSegundoParcial',
      ],
      where: { id: notaId },
    })
    .then((nota) => {
      if (nota) {
        res.status(200).json(nota);
      } else {
        res.status(404).json({ error: 'nota no fue encontrada' });
      }
    })
    .catch((err) => {
      console.error('Error al obtener la nota:', err);
      res.status(500).json({ error: 'Error al obtener la nota' });
    });
});

/**
 * @swagger
 * /Nota/{id}:
 *   put:
 *     summary: Actualiza una Nota por su ID
 *     tags:
 *       - Nota
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Datos de la Nota a actualizar
 *         required: true
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notaPrimerParcial:
 *                 type: integer
 *                 description: nota de la primer nota
 *               notaSegundoParcial:
 *                 type: integer
 *                 description: nota de la segunda nota
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
 *         description: nota no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', (req, res) => {
  const notaId = req.params.id;
  const { notaPrimerParcial, notaSegundoParcial } = req.body;

  models.nota
    .update(
      { notaPrimerParcial, notaSegundoParcial },
      { where: { id: notaId } },
    )
    .then((numUpdated) => {
      if (numUpdated[0] === 1) {
        res.status(200).json({ message: 'nota actualizada correctamente' });
      } else {
        res.status(404).json({ error: 'nota no encontrada' });
      }
    })
    .catch((err) => {
      console.error('Error al actualizar la nota:', err);
      res.status(500).json({ error: 'Error al actualizar la nota' });
    });
});

/**
 * @swagger
 * /Nota/{id}:
 *   delete:
 *     summary: Elimina una Nota por su ID
 *     tags: [Nota]
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
 *         description: Nota no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', (req, res) => {
  const notaId = req.params.id;

  models.nota
    .destroy({
      where: { id: notaId },
    })
    .then((numDeleted) => {
      if (numDeleted === 1) {
        res.status(200).json({ message: 'nota eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'nota no encontrada' });
      }
    })
    .catch((err) => {
      console.error('Error al eliminar la nota:', err);
      res.status(500).json({ error: 'Error al eliminar la nota' });
    });
});

module.exports = router;
