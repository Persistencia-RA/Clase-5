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
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Número de página
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         description: Tamaño de página
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alumnos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID del alumno
 *                       nombre:
 *                         type: string
 *                         description: Nombre del alumno
 *                       apellido:
 *                         type: string
 *                         description: Apellido del alumno
 *                       carrera:
 *                         type: object
 *                         properties:
 *                           nombre:
 *                             type: string
 *                             description: Nombre de la carrera
 *                       materia:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               description: ID de la materia
 *                             nombre:
 *                               type: string
 *                               description: Nombre de la materia
 *                             nota:
 *                               type: object
 *                               properties:
 *                                 notaPrimerParcial:
 *                                   type: integer
 *                                   description: Nota del primer parcial
 *                                 notaSegundoParcial:
 *                                   type: integer
 *                                   description: Nota del segundo parcial
 *               currentPage:
 *                 type: integer
 *                 description: Página actual
 *               totalPages:
 *                 type: integer
 *                 description: Número total de páginas
 *               totalCount:
 *                 type: integer
 *                 description: Total de alumnos
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', (req, res, next) => {
  const page = req.query.page || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const offset = (page - 1) * pageSize;
  models.alumno
    .findAndCountAll({
      attributes: ['id', 'nombre', 'apellido'],
      distinct: true,
      include: [
        {
          model: models.carrera,
          attributes: ['nombre'],
        },
        {
          model: models.materia,
          attributes: ['id', 'nombre'],
          through: { attributes: ['notaPrimerParcial', 'notaSegundoParcial'] },
        },
      ],
      limit: pageSize,
      offset,
    })
    .then((result) => {
      const alumnos = result.rows;
      const totalCount = result.count;

      const totalPages = Math.ceil(totalCount / pageSize);
      res.send({
        alumnos,
        currentPage: page,
        totalPages,
        totalCount,
      });
    })
    .catch((error) => {
      return next(error);
    });
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
 *               nombre:
 *                 type: string
 *                 description: Nombre del alumno
 *               apellido:
 *                 type: string
 *                 description: Apellido del alumno
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alumnos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID del alumno
 *                       nombre:
 *                         type: string
 *                         description: Nombre del alumno
 *                       apellido:
 *                         type: string
 *                         description: Apellido del alumno
 *                       carrera:
 *                         type: object
 *                         properties:
 *                           nombre:
 *                             type: string
 *                             description: Nombre de la carrera
 *                       materia:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               description: ID de la materia
 *                             nombre:
 *                               type: string
 *                               description: Nombre de la materia
 *                             nota:
 *                               type: object
 *                               properties:
 *                                 notaPrimerParcial:
 *                                   type: integer
 *                                   description: Nota del primer parcial
 *                                 notaSegundoParcial:
 *                                   type: integer
 *                                   description: Nota del segundo parcial
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', (req, res) => {
  const r = req.body;
  models.alumno
    .create({
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
        {
          model: models.carrera,
          attributes: ['nombre'],
        },
        {
          model: models.materia,
          attributes: ['id', 'nombre'],
          through: { attributes: ['notaPrimerParcial', 'notaSegundoParcial'] },
        },
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
 *                 alumnos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID del alumno
 *                       nombre:
 *                         type: string
 *                         description: Nombre del alumno
 *                       apellido:
 *                         type: string
 *                         description: Apellido del alumno
 *                       carrera:
 *                         type: object
 *                         properties:
 *                           nombre:
 *                             type: string
 *                             description: Nombre de la carrera
 *                       materia:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               description: ID de la materia
 *                             nombre:
 *                               type: string
 *                               description: Nombre de la materia
 *                             nota:
 *                               type: object
 *                               properties:
 *                                 notaPrimerParcial:
 *                                   type: integer
 *                                   description: Nota del primer parcial
 *                                 notaSegundoParcial:
 *                                   type: integer
 *                                   description: Nota del segundo parcial
 *               currentPage:
 *                 type: integer
 *                 description: Página actual
 *               totalPages:
 *                 type: integer
 *                 description: Número total de páginas
 *               totalCount:
 *                 type: integer
 *                 description: Total de alumnos
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
          nombre: r.nombre,
          apellido: r.apellido,
        },
        { fields: ['nombre', 'apellido', 'carreraId'] },
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
