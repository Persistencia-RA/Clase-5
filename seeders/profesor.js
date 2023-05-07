'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('profesor', [
      {
        id_materia: 1,
        id_aula: 1,
        nombre: 'Jorge',
        apellido: 'Hernández',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_materia: 2,
        id_aula: 2,
        nombre: 'Lucía',
        apellido: 'García',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_materia: 3,
        id_aula: 3,
        nombre: 'Pedro',
        apellido: 'Sánchez',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_materia: 4,
        id_aula: 2,
        nombre: 'María',
        apellido: 'Martínez',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_materia: 3,
        id_aula: 3,
        nombre: 'Luis',
        apellido: 'González',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('profesor', null, {});
  },
};
