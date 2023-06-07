const express = require('express');
const router = express.Router();
const models = require('../models');
const verifyToken = require('../libs/verifyToken');

/**
 * @swagger
 * /materia:
 *   get:
 *     summary: Obtiene todas las materias
 *     tags:
 *       - Materias
 *     security:
 *       - bearerAuth: []
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
 *                 materias:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la materia
 *                       nombre:
 *                         type: string
 *                         description: Nombre de la materia
 *                       aula:
 *                         type: object
 *                         properties:
 *                           nroAula:
 *                             type: integer
 *                             description: Número de laboratorio del aula
 *                       profesor:
 *                         type: object
 *                         properties:
 *                           nombre:
 *                             type: string
 *                             description: Nombre del profesor
 *                           apellido:
 *                             type: string
 *                             description: Apellido del profesor
 *                       carreras:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             nombre:
 *                               type: string
 *                               description: Nombre de la carrera
 *                             materiacarrera:
 *                               type: object
 *                               properties:
 *                                 carreraId:
 *                                   type: integer
 *                                   description: ID de la carrera
 *                 currentPage:
 *                   type: integer
 *                   description: Página actual
 *                 totalPages:
 *                   type: integer
 *                   description: Número total de páginas
 *                 totalCount:
 *                   type: integer
 *                   description: Total de materias
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', verifyToken, (req, res, next) => {
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
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
router.post('/', verifyToken, (req, res) => {
  models.materia
    .create({
      nombre: req.body.nombre,
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
          through: { attributes: ['id', 'carreraId'] },
        },
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
 *     security:
 *       - bearerAuth: []
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
 *                       id:
 *                         type: integer
 *                         description: ID de la materia
 *                       nombre:
 *                         type: string
 *                         description: Nombre de la materia
 *                       aula:
 *                         type: object
 *                         properties:
 *                           nroAula:
 *                             type: integer
 *                             description: Número de laboratorio del aula
 *                       profesor:
 *                         type: object
 *                         properties:
 *                           nombre:
 *                             type: string
 *                             description: Nombre del profesor
 *                           apellido:
 *                             type: string
 *                             description: Apellido del profesor
 *                       carreras:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             nombre:
 *                               type: string
 *                               description: Nombre de la carrera
 *                             materiacarrera:
 *                               type: object
 *                               properties:
 *                                 carreraId:
 *                                   type: integer
 *                                   description: ID de la carrera
 *       404:
 *         description: Materia no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', verifyToken, (req, res) => {
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
 *     security:
 *       - bearerAuth: []
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
router.put('/:id', verifyToken, (req, res) => {
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
 *     security:
 *       - bearerAuth: []
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
router.delete('/:id', verifyToken, (req, res) => {
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
