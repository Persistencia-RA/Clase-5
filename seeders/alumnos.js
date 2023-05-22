module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('alumno', [
      {
        nombre: 'Juan',
        apellido: 'Pérez',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'María',
        apellido: 'González',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Carlos',
        apellido: 'García',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Ana',
        apellido: 'Martínez',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Pedro',
        apellido: 'Sánchez',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('alumno', null, {});
  },
};
