module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('alumnomateria', [
      {
        alumnoId: 1,
        materiaId: 1,
        notaPrimerParcial: 8,
        notaSegundoParcial: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alumnoId: 1,
        materiaId: 2,
        notaPrimerParcial: 5,
        notaSegundoParcial: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alumnoId: 1,
        materiaId: 3,
        notaPrimerParcial: 8,
        notaSegundoParcial: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alumnoId: 2,
        materiaId: 4,
        notaPrimerParcial: 8,
        notaSegundoParcial: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        alumnoId: 3,
        materiaId: 5,
        notaPrimerParcial: 8,
        notaSegundoParcial: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('alumnomateria', null, {});
  },
};
