const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /alumno:
 *   get:
 *     summary: Obtiene todos los alumnos
 *     tags:
 *       - Alumnos
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
 *                    id:
 *                     type: integer
 *                     description: ID del alumno
 *                   id_materia:
 *                     type: integer
 *                     description: ID materia
 *                   id_aula:
 *                     type: integer
 *                     description: ID aula
 *                   nombre:
 *                     type: string
 *                     description: Nombre del alumno
 *                   apellido:
 *                     type: string
 *                     description: Apellido del alumno
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', (req, res) => {
  console.log('Esto es un mensaje para ver en consola');
  models.alumno
    .findAll({
      attributes: ['id', 'nombre', 'apellido'],
      include: [
        { as: 'aula', model: models.aula, attributes: ['id', 'numero_lab'] },
        { as: 'materia', model: models.materia, attributes: ['id', 'nombre'] },
      ],
    })
    .then((alumnos) => res.send(alumnos))
    .catch(() => res.sendStatus(500));
});

/**
 * @swagger
 * /alumno:
 *   post:
 *     summary: Crea un nuevo alumno
 *     tags:
 *       - Alumnos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_materia:
 *                 type: integer
 *                 description: ID de la materia del alumno
 *               id_aula:
 *                 type: integer
 *                 description: ID del aula del alumno
 *               nombre:
 *                 type: string
 *                 description: Nombre del alumno
 *               apellido:
 *                 type: string
 *                 description: Apellido del alumno
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
 *                   description: ID del alumno creado
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', (req, res) => {
  const r = req.body;
  models.alumno
    .create({
      id_materia: r.id_materia,
      id_aula: r.id_aula,
      nombre: r.nombre,
      apellido: r.apellido,
    })
    .then((alumno) => res.status(201).send({ id: alumno.id }))
    .catch((error) => {
      if (error === 'SequelizeUniqueConstraintError: Validation error') {
        res
          .status(400)
          .send('Bad request: existe otro alumno con el mismo nombre');
      } else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`);
        res.sendStatus(500);
      }
    });
});

const findAlumno = (id, { onSuccess, onNotFound, onError }) => {
  models.alumno
    .findOne({
      attributes: ['id', 'nombre', 'apellido'],
      include: [
        { as: 'aula', model: models.aula, attributes: ['id', 'numero_lab'] },
        { as: 'materia', model: models.materia, attributes: ['id', 'nombre'] },
      ],
      where: { id },
    })
    .then((alumno) => (alumno ? onSuccess(alumno) : onNotFound()))
    .catch(() => onError());
};

/**
 * @swagger
 * /alumno/{id}:
 *   get:
 *     summary: Obtiene un alumno por ID
 *     tags:
 *       - Alumnos
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del alumno a obtener
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
 *                   description: ID del alumno
 *                 id_materia:
 *                   type: integer
 *                   description: ID de la materia del alumno
 *                 id_aula:
 *                   type: integer
 *                   description: ID del aula del alumno
 *                 nombre:
 *                   type: string
 *                   description: Nombre del alumno
 *                 apellido:
 *                   type: string
 *                   description: Apellido del alumno
 *       404:
 *         description: Alumno no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', (req, res) => {
  findAlumno(req.params.id, {
    onSuccess: (alumno) => res.send(alumno),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

/**
 * @swagger
 * /alumno/{id}:
 *   put:
 *     summary: Actualiza un alumno existente
 *     tags:
 *       - Alumnos
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del alumno a actualizar
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
 *                 description: Nuevo ID de la materia del alumno
 *               id_aula:
 *                 type: integer
 *                 description: Nuevo ID del aula del alumno
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre del alumno
 *               apellido:
 *                 type: string
 *                 description: Nuevo apellido del alumno
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Alumno no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', (req, res) => {
  const r = req.body;
  const onSuccess = (alumno) =>
    alumno
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
  findAlumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

/**
 * @swagger
 * /alumno/{id}:
 *   delete:
 *     summary: Elimina un alumno existente
 *     tags:
 *       - Alumnos
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del alumno a eliminar
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Alumno no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', (req, res) => {
  const onSuccess = (alumno) =>
    alumno
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findAlumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

module.exports = router;
