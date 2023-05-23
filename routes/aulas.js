const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /aula:
 *   get:
 *     summary: Obtiene todas las aulas
 *     tags:
 *       - Aulas
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
 *                 aulas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID del aula
 *                       numero_lab:
 *                         type: string
 *                         description: Número de laboratorio del aula
 *                 currentPage:
 *                   type: integer
 *                   description: Página actual
 *                 totalPages:
 *                   type: integer
 *                   description: Número total de páginas
 *                 totalCount:
 *                   type: integer
 *                   description: Total de aulas
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', (req, res, next) => {
  const page = req.query.page || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const offset = (page - 1) * pageSize;
  models.aula
    .findAndCountAll({
      attributes: ['id', 'nroAula'],
      include: [
        {
          model: models.materia,
          attributes: ['id', 'nombre'],
        },
      ],
      limit: pageSize,
      offset,
    })
    .then((result) => {
      const aulas = result.rows;
      const totalCount = result.count;

      const totalPages = Math.ceil(totalCount / pageSize);
      res.send({
        aulas,
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
 * /aula:
 *   post:
 *     summary: Crea una nueva aula
 *     tags:
 *       - Aulas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_lab:
 *                 type: string
 *                 description: Número de laboratorio del aula
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
 *                   description: ID del aula creado
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', (req, res) => {
  models.aula
    .create({ nroAula: req.body.nroAula })
    .then((aula) => res.status(201).send({ id: aula.id }))
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

const findAula = (id, { onSuccess, onNotFound, onError }) => {
  models.aula
    .findOne({
      attributes: ['id', 'nroAula'],
      include: [
        {
          model: models.materia,
          attributes: ['id', 'nombre'],
        },
      ],
      where: { id },
    })
    .then((aula) => (aula ? onSuccess(aula) : onNotFound()))
    .catch(() => onError());
};

/**
 * @swagger
 * /aula/{id}:
 *   get:
 *     summary: Obtiene un aula por ID
 *     tags:
 *       - Aulas
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del aula a obtener
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
 *                   description: ID del aula
 *                 numero_lab:
 *                   type: string
 *                   description: Número de laboratorio del aula
 *       404:
 *         description: Aula no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', (req, res) => {
  findAula(req.params.id, {
    onSuccess: (aula) => res.send(aula),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

/**
 * @swagger
 * /aula/{id}:
 *   put:
 *     summary: Actualiza un aula por ID
 *     tags:
 *       - Aulas
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del aula a actualizar
 *         required: true
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero_lab:
 *                 type: string
 *                 description: Número de laboratorio del aula
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Aula no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', (req, res) => {
  const onSuccess = (aula) =>
    aula
      .update({ nroAula: req.body.nroAula }, { fields: ['nroAula'] })
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
  findAula(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

/**
 * @swagger
 * /aula/{id}:
 *   delete:
 *     summary: Elimina un aula por ID
 *     tags:
 *       - Aulas
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del aula a eliminar
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Aula no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', (req, res) => {
  const onSuccess = (aula) =>
    aula
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findAula(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

module.exports = router;
