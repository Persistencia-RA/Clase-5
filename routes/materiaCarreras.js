const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /materiaCarrera:
 *   post:
 *     summary: Crea una nueva materiacarrera
 *     tags: [materiaCarrera]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               materiaId:
 *                 type: integer
 *                 description: id de la materia
 *               carreraId:
 *                 type: integer
 *                 description: id de la carrera
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
 *                   description: ID de la materiaCarrera
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
  const { materiaId, carreraId } = req.body;

  models.materiacarrera
    .create({ materiaId, carreraId })
    .then((materiacarrera) => {
      res.status(201).json(materiacarrera);
    })
    .catch((err) => {
      console.error('Error al crear la materiacarrera:', err);
      res.status(500).json({ error: 'Error al crear la materiacarrera' });
    });
});

/**
 * @swagger
 * /materiaCarrera/{id}:
 *   get:
 *     summary: Obtiene una materiaCarrera por su ID
 *     tags:
 *       - materiaCarrera
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
 *               materiaId:
 *                 type: integer
 *                 description: id de la materia
 *               carreraId:
 *                 type: integer
 *                 description: id de la carrera
 *       404:
 *         description: Materia no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', (req, res) => {
  const materiacarreraId = req.params.id;
  models.materiacarrera
    .findOne({
      attributes: ['id', 'materiaId', 'carreraId'],
      where: { id: materiacarreraId },
    })
    .then((materiacarrera) => {
      if (materiacarrera) {
        res.status(200).json(materiacarrera);
      } else {
        res.status(404).json({ error: 'Materiacarrera no encontrada' });
      }
    })
    .catch((err) => {
      console.error('Error al obtener la materiacarrera:', err);
      res.status(500).json({ error: 'Error al obtener la materiacarrera' });
    });
});

/**
 * @swagger
 * /materiaCarrera/{id}:
 *   put:
 *     summary: Actualiza una materiaCarrera por su ID
 *     tags:
 *       - materiaCarrera
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Datos de la materiaCarrera a actualizar
 *         required: true
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               materiaId:
 *                 type: integer
 *                 description: id de la materia
 *               carreraId:
 *                 type: integer
 *                 description: id de la carreraa
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
 *         description: Materia no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', (req, res) => {
  const materiacarreraId = req.params.id;
  const { materiaId, carreraId } = req.body;

  models.materiacarrera
    .update({ materiaId, carreraId }, { where: { id: materiacarreraId } })
    .then((numUpdated) => {
      if (numUpdated[0] === 1) {
        res
          .status(200)
          .json({ message: 'Materiacarrera actualizada correctamente' });
      } else {
        res.status(404).json({ error: 'Materiacarrera no encontrada' });
      }
    })
    .catch((err) => {
      console.error('Error al actualizar la materiacarrera:', err);
      res.status(500).json({ error: 'Error al actualizar la materiacarrera' });
    });
});

/**
 * @swagger
 * /materiaCarrera/{id}:
 *   delete:
 *     summary: Elimina una materiaCarrera por su ID
 *     tags: [materiaCarrera]
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
 *         description: materiaCarrera no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', (req, res) => {
  const materiacarreraId = req.params.id;

  models.materiacarrera
    .destroy({
      where: { id: materiacarreraId },
    })
    .then((numDeleted) => {
      if (numDeleted === 1) {
        res
          .status(200)
          .json({ message: 'Materiacarrera eliminada correctamente' });
      } else {
        res.status(404).json({ error: 'Materiacarrera no encontrada' });
      }
    })
    .catch((err) => {
      console.error('Error al eliminar la materiacarrera:', err);
      res.status(500).json({ error: 'Error al eliminar la materiacarrera' });
    });
});

module.exports = router;
