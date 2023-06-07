module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usuario', [
      {
        nombre: 'ValentinoChap',
        contraseña: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'LucasBona',
        contraseña: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'JulietaNog',
        contraseña: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuario', null, {});
  },
};
