const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /profesor:
 *   get:
 *    summary: Obtiene todos los profesores
 *    tags:
 *      - Profesores
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    description: ID del profesor
 *                  id_materia:
 *                    type: integer
 *                    description: ID de la materia
 *                  id_aula:
 *                    type: integer
 *                    description: ID del aula
 *                  nombre:
 *                    type: string
 *                    description: Nombre del profesor
 *                  apellido:
 *                    type: string
 *                    description: Apellido del profesor
 *      500:
 *         description: Error interno del servidor
 */
router.get('/', (req, res) => {
  console.log('Esto es un mensaje para ver en consola');
  models.profesor
    .findAll({
      attributes: ['id', 'nombre', 'apellido'],
      include: [
        { as: 'aula', model: models.aula, attributes: ['id', 'numero_lab'] },
        { as: 'materia', model: models.materia, attributes: ['id', 'nombre'] },
      ],
    })
    .then((profesores) => res.send(profesores))
    .catch(() => res.sendStatus(500));
});

/**
 * @swagger
 * /profesor:
 *   post:
 *     summary: Crea un nuevo profesor
 *     tags: [Profesores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_materia:
 *                 type: integer
 *                 description: ID de la materia
 *               id_aula:
 *                 type: integer
 *                 description: ID del aula
 *               nombre:
 *                 type: string
 *                 description: Nombre del profesor
 *               apellido:
 *                 type: string
 *                 description: Apellido del profesor
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
 *                   description: ID del profesor
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
  models.profesor
    .create({
      id_materia: r.id_materia,
      id_aula: r.id_aula,
      nombre: r.nombre,
      apellido: r.apellido,
    })
    .then((profesor) => res.status(201).send({ id: profesor.id }))
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

const findProfesor = (id, { onSuccess, onNotFound, onError }) => {
  models.profesor
    .findOne({
      attributes: ['id', 'nombre', 'apellido'],
      include: [
        { as: 'aula', model: models.aula, attributes: ['id', 'numero_lab'] },
        { as: 'materia', model: models.materia, attributes: ['id', 'nombre'] },
      ],
      where: { id },
    })
    .then((profesor) => (profesor ? onSuccess(profesor) : onNotFound()))
    .catch(() => onError());
};

/**
 * @swagger
 * /profesor/{id}:
 *   get:
 *     summary: Obtiene un profesor por su ID
 *     tags:
 *       - Profesores
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
 *                  id:
 *                    type: integer
 *                    description: ID del profesor
 *                  id_materia:
 *                    type: integer
 *                    description: ID de la materia
 *                  id_aula:
 *                    type: integer
 *                    description: ID del aula
 *                  nombre:
 *                    type: string
 *                    description: Nombre del profesor
 *                  apellido:
 *                    type: string
 *                    description: Apellido del profesor
 *       404:
 *         description: Profesor no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', (req, res) => {
  findProfesor(req.params.id, {
    onSuccess: (profesor) => res.send(profesor),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

/**
 * @swagger
 * /profesor/{id}:
 *   put:
 *     summary: Actualiza un profesor por su ID
 *     tags:
 *       - Profesores
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Datos del profesor a actualizar
 *         required: true
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_materia:
 *                 type: integer
 *                 description: ID de la materia
 *               id_aula:
 *                 type: integer
 *                 description: ID del aula
 *               nombre:
 *                 type: string
 *                 description: Nombre del profesor
 *               apellido:
 *                 type: string
 *                 description: Apellido del profesor
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
 *         description: Profesor no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', (req, res) => {
  const r = req.body;
  const onSuccess = (profesor) =>
    profesor
      .update(
        {
          id_materia: r.id_materia,
          id_aula: r.id_aula,
          nombre: r.nombre,
          apellido: r.apellido,
        },
        { fields: ['id_materia', 'id_aula', 'nombre', 'apellido'] },
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
  findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

/**
 * @swagger
 * /profesor/{id}:
 *   delete:
 *     summary: Elimina un profesor por su ID
 *     tags: [Profesores]
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
 *         description: Profesor no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', (req, res) => {
  const onSuccess = (profesor) =>
    profesor
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

module.exports = router;
