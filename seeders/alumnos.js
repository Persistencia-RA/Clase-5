module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('alumno', [
      {
        id_materia: 1,
        id_aula: 1,
        nombre: 'Juan',
        apellido: 'Pérez',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_materia: 2,
        id_aula: 2,
        nombre: 'María',
        apellido: 'González',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_materia: 3,
        id_aula: 3,
        nombre: 'Carlos',
        apellido: 'García',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_materia: 4,
        id_aula: 1,
        nombre: 'Ana',
        apellido: 'Martínez',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_materia: 3,
        id_aula: 2,
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
