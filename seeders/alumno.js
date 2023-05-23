module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('alumno', [
      {
        nombre: 'Juan',
        apellido: 'Pérez',
        carreraId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'María',
        apellido: 'González',
        carreraId: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Carlos',
        apellido: 'García',
        carreraId: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Ana',
        apellido: 'Martínez',
        carreraId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Pedro',
        apellido: 'Sánchez',
        carreraId: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('alumno', null, {});
  },
};
