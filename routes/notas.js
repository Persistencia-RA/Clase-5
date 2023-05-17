const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /nota:
 *   get:
 *     summary: Obtiene todas las notas
 *     tags:
 *       - Notas
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
 *                     description: ID de la nota
 *                   id_alumno:
 *                     type: integer
 *                     description: ID del alumno
 *                   id_materia:
 *                     type: integer
 *                     description: ID de la materia
 *                   calificacion:
 *                     type: integer
 *                     description: Calificación de la materia
 *       500:
 *         description: Error interno del servidor
 */
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

/**
 * @swagger
 * /nota:
 *   post:
 *     summary: Crea una nueva nota
 *     tags: [Notas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_alumno:
 *                 type: integer
 *                 description: ID del alumno
 *               id_materia:
 *                 type: integer
 *                 description: ID de la materia
 *               calificacion:
 *                 type: integer
 *                 description: Calificación de la materia
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
  console.log('Hola');
  models.nota
    .findOne({
      attributes: ['id', 'calificacion'],
      include: [
        { as: 'alumno', model: models.alumno, attributes: ['id', 'nombre'] },
        { as: 'materia', model: models.materia, attributes: ['id', 'nombre'] },
      ],
      where: { id },
    })
    .then((nota) => (nota ? onSuccess(nota) : onNotFound()))
    .catch(() => onError());
};

/**
 * @swagger
 * /nota/{id}:
 *   get:
 *     summary: Obtiene una nota por su ID
 *     tags:
 *       - Notas
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
 *                   description: ID de la nota
 *                 id_alumno:
 *                   type: integer
 *                   description: ID del alumno
 *                 id_materia:
 *                   type: integer
 *                   description: ID de la materia
 *                 calificacion:
 *                   type: integer
 *                   description: Calificación de la materia
 *       404:
 *         description: Materia no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', (req, res) => {
  findNota(req.params.id, {
    onSuccess: (nota) => res.send(nota),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

/**
 * @swagger
 * /nota/{id}:
 *   put:
 *     summary: Actualiza una nota por su ID
 *     tags:
 *       - Notas
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Datos de la nota a actualizar
 *         required: true
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_alumno:
 *                 type: integer
 *                 description: ID del alumno
 *               id_materia:
 *                 type: integer
 *                 description: ID de la materia
 *               calificacion:
 *                 type: integer
 *                 description: Calificación de la materia
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
 *         description: Nota no encontrada
 *       500:
 *         description: Error interno del servidor
 */
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

/**
 * @swagger
 * /nota/{id}:
 *   delete:
 *     summary: Elimina una nota por su ID
 *     tags: [Notas]
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
