'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('nota', [
      {
        id_alumno: 1,
        id_materia: 1,
        calificacion: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_alumno: 2,
        id_materia: 2,
        calificacion: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_alumno: 3,
        id_materia: 3,
        calificacion: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_alumno: 4,
        id_materia: 1,
        calificacion: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_alumno: 3,
        id_materia: 2,
        calificacion: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('nota', null, {});
  },
};
