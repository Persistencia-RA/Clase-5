module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('login', [
      {
        usuario: 'ValentinoChap',
        contraseña: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        usuario: 'LucasBona',
        contraseña: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        usuario: 'JulietaNog',
        contraseña: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('login', null, {});
  },
};
