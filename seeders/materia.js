module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'materia',
      [
        {
          id_carrera: 1,
          nombre: 'Programación I',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_carrera: 1,
          nombre: 'Base de Datos',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_carrera: 2,
          nombre: 'Contabilidad',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_carrera: 3,
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
