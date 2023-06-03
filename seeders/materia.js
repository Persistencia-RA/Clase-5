module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'materia',
      [
        {
          nombre: 'Programación I',
          aulaId: '1',
          profesorId: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: 'Base de Datos',
          aulaId: '1',
          profesorId: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: 'Organización de computadoras',
          aulaId: '1',
          profesorId: '2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: 'Contabilidad',
          aulaId: '2',
          profesorId: '3',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: 'Derecho Constitucional',
          aulaId: '3',
          profesorId: '4',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: 'Matemática I',
          aulaId: '2',
          profesorId: '3',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: 'Inglés I',
          aulaId: '4',
          profesorId: '5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: 'Filosofía',
          aulaId: '3',
          profesorId: '6',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: 'Álgebra',
          aulaId: '2',
          profesorId: '3',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: 'Derecho Penal',
          aulaId: '3',
          profesorId: '4',
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
