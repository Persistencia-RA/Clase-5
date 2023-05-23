'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'aula',
      [
        {
          nroAula: 101,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nroAula: 102,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nroAula: 201,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nroAula: 202,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('aula', null, {});
  },
};
