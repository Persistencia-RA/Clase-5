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
 *               currentPage:
 *                  type: integer
 *                  description: Página actual
 *               totalPages:
 *                 type: integer
 *                 description: Número total de páginas
 *               totalCount:
 *                 type: integer
 *                 description: Total de aulas
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', (req, res, next) => {
  const page = req.query.page || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const offset = (page - 1) * pageSize;
  models.Carrera.findAndCountAll({
    attributes: ['id', 'nombre'],
    limit: pageSize,
    offset,
  })
    .then((result) => {
      const carreras = result.rows;
      const totalCount = result.count;

      const totalPages = Math.ceil(totalCount / pageSize);
      res.send({
        carreras,
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
  models.Carrera.create({ nombre: req.body.nombre })
    .then((Carrera) => res.status(201).send({ id: Carrera.id }))
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
 *     tags:
 *       - Carreras
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la carrea a actualizar
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
 *                 description: Nuevo nombre de la carrera
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
  const onSuccess = (Carrera) =>
    Carrera.destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findCarrera(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

const findCarrera = (id, { onSuccess, onNotFound, onError }) => {
  models.Carrera.findOne({
    attributes: ['id', 'nombre'],
    where: { id },
  })
    .then((Carrera) => (Carrera ? onSuccess(Carrera) : onNotFound()))
    .catch(() => onError());
};

module.exports = router;
