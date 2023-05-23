const express = require('express');
const router = express.Router();
const models = require('../models');

/**
 * @swagger
 * /materia:
 *   get:
 *     summary: Obtiene todas las materias
 *     tags:
 *       - Materias
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
 *                     description: ID de la materia
 *                   carreraId:
 *                     type: integer
 *                     description: ID de la carrera
 *                   nombre:
 *                     type: string
 *                     description: Nombre de la materia
 *               currentPage:
 *                   type: integer
 *                   description: Página actual
 *               totalPages:
 *                   type: integer
 *                   description: Número total de páginas
 *               totalCount:
 *                   type: integer
 *                   description: Total de aulas
 *
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', (req, res, next) => {
  const page = req.query.page || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const offset = (page - 1) * pageSize;
  models.materia
    .findAndCountAll({
      attributes: ['id', 'nombre'],
      include: [
        {
          model: models.aula,
          attributes: ['nroAula'],
        },
        {
          model: models.profesor,
          attributes: ['nombre', 'apellido'],
        },
        {
          model: models.carrera,
          attributes: ['nombre'],
          through: { attributes: ['carreraId'] },
        },
      ],
      limit: pageSize,
      offset,
    })
    .then((result) => {
      const materias = result.rows;
      const totalCount = result.count;

      const totalPages = Math.ceil(totalCount / pageSize);
      res.send({
        materias,
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
 * /materia:
 *   post:
 *     summary: Crea una nueva materia
 *     tags: [Materias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_carrera:
 *                 type: integer
 *                 description: ID de la carrera
 *               nombre:
 *                 type: string
 *                 description: Nombre de la materia
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
 *                   description: ID de la carrera materia
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
  models.materia
    .create({
      nombre: req.body.nombre,
      aulaId: req.body.aulaId,
      profesorId: req.body.profesorId,
    })
    .then((materia) => res.status(201).send({ id: materia.id }))
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

const findMateria = (id, { onSuccess, onNotFound, onError }) => {
  models.materia
    .findOne({
      attributes: ['id', 'nombre'],
      include: [
        { as: 'carrera', model: models.carrera, attributes: ['id', 'nombre'] },
      ],
      where: { id },
    })
    .then((materia) => (materia ? onSuccess(materia) : onNotFound()))
    .catch(() => onError());
};

/**
 * @swagger
 * /materia/{id}:
 *   get:
 *     summary: Obtiene una materia por su ID
 *     tags:
 *       - Materias
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
 *                   description: ID de la materia
 *                 id_carrera:
 *                   type: integer
 *                   description: ID de la carrera
 *                 nombre:
 *                   type: string
 *                   description: Nombre de la materia
 *       404:
 *         description: Materia no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', (req, res) => {
  findMateria(req.params.id, {
    onSuccess: (materia) => res.send(materia),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

/**
 * @swagger
 * /materia/{id}:
 *   put:
 *     summary: Actualiza una materia por su ID
 *     tags:
 *       - Materias
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Datos de la materia a actualizar
 *         required: true
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_carrera:
 *                 type: integer
 *                 description: ID de la carrera
 *               nombre:
 *                 type: string
 *                 description: Nombre de la materia
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
  const onSuccess = (materia) =>
    materia
      .update({ nombre: req.body.nombre }, { fields: ['nombre'] })
      .then(() => res.sendStatus(200))
      .catch((error) => {
        if (error === 'SequelizeUniqueConstraintError: Validation error') {
          res
            .status(400)
            .send('Bad request: existe otra materia con el mismo nombre');
        } else {
          console.log(
            `Error al intentar actualizar la base de datos: ${error}`,
          );
          res.sendStatus(500);
        }
      });
  findMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

/**
 * @swagger
 * /materia/{id}:
 *   delete:
 *     summary: Elimina una materia por su ID
 *     tags: [Materias]
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
 *         description: Materia no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', (req, res) => {
  const onSuccess = (materia) =>
    materia
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500),
  });
});

module.exports = router;
