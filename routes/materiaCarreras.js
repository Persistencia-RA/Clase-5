const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /MateriaCarrera:
 *   post:
 *     summary: Crea una nueva Materiacarrera
 *     tags: [MateriaCarrera]
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
router.post('/', async (req, res) => {
  const { materiaId, carreraId } = req.body;

  try {
    // Verificar si la materia existe
    const materia = await models.materia.findByPk(materiaId);
    // Verificar si la carrera existe
    const carrera = await models.carrera.findByPk(carreraId);

    if (!materia) {
      return res.status(400).json({ error: 'La materia no existe' });
    } else if (!carrera) {
      return res.status(400).json({ error: 'La carrera no existe' });
    } else {
      // Crear la materiacarrera si la materia y carrera existen
      const materiacarrera = await models.materiacarrera.create({
        materiaId,
        carreraId,
      });

      res.status(201).json(materiacarrera);
    }
  } catch (err) {
    console.error('Error al crear la materiacarrera:', err);
    res.status(500).json({ error: 'Error al crear la materiacarrera' });
  }
});

/**
 * @swagger
 * /MateriaCarrera/{id}:
 *   get:
 *     summary: Obtiene una MateriaCarrera por su ID
 *     tags:
 *       - MateriaCarrera
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
 * /MateriaCarrera/{id}:
 *   put:
 *     summary: Actualiza una MateriaCarrera por su ID
 *     tags:
 *       - MateriaCarrera
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
 * /MateriaCarrera/{id}:
 *   delete:
 *     summary: Elimina una MateriaCarrera por su ID
 *     tags: [MateriaCarrera]
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
