module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'materia',
      [
        {
          carreraId: 1,
          nombre: 'Programación I',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          carreraId: 1,
          nombre: 'Base de Datos',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          carreraId: 1,
          nombre: 'Organización de computadoras',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          carreraId: 2,
          nombre: 'Contabilidad',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          carreraId: 3,
          nombre: 'Derecho Constitucional',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('materia', null, {});
  },
};
