'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'aula',
      [
        {
          numero_lab: 101,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          numero_lab: 102,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          numero_lab: 201,
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
