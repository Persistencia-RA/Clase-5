'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('profesor', [
      {
        nombre: 'Jorge',
        apellido: 'Hernández',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Lucía',
        apellido: 'García',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Pedro',
        apellido: 'Sánchez',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'María',
        apellido: 'Martínez',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Luis',
        apellido: 'González',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Florencia',
        apellido: 'Rodriguez',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('profesor', null, {});
  },
};
