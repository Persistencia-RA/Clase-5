module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('materiaCarrera', [
      {
        materiaId: 1,
        carreraId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        materiaId: 2,
        carreraId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        materiaId: 3,
        carreraId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        materiaId: 4,
        carreraId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        materiaId: 5,
        carreraId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        materiaId: 6,
        carreraId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        materiaId: 6,
        carreraId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        materiaId: 7,
        carreraId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        materiaId: 7,
        carreraId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        materiaId: 7,
        carreraId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        materiaId: 8,
        carreraId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        materiaId: 8,
        carreraId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        materiaId: 9,
        carreraId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        materiaId: 9,
        carreraId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        materiaId: 10,
        carreraId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('materiaCarrera', null, {});
  },
};
