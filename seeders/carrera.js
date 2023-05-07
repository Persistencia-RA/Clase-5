module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'carrera',
      [
        {
          nombre: 'Ingeniería en Sistemas',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: 'Licenciatura en Administración de Empresas',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: 'Licenciatura en Derecho',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('carrera', null, {});
  },
};
