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
 *    parameters:
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
 *              currentPage:
 *                   type: integer
 *                   description: Página actual
 *              totalPages:
 *                   type: integer
 *                   description: Número total de páginas
 *              totalCount:
 *                   type: integer
 *                   description: Total de aulas
 *      500:
 *         description: Error interno del servidor
 */
router.get('/', (req, res, next) => {
  const page = req.query.page || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const offset = (page - 1) * pageSize;
  models.profesor
    .findAndCountAll({
      attributes: ['id', 'nombre', 'apellido'],
      include: [
        { as: 'materia', model: models.materia, attributes: ['nombre'] },
      ],
      limit: pageSize,
      offset,
    })
    .then((result) => {
      const profesores = result.rows;
      const totalCount = result.count;

      const totalPages = Math.ceil(totalCount / pageSize);
      res.send({
        profesores,
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
          nombre: r.nombre,
          apellido: r.apellido,
        },
        { fields: ['nombre', 'apellido'] },
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
