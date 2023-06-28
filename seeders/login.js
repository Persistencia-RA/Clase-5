const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const users = [
  { nombre: 'ValentinoChap', contraseña: '123456' },
  { nombre: 'LucasBona', contraseña: '123456' },
  { nombre: 'JulietaNog', contraseña: '123456' },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seededUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await hashPassword(user.contraseña);
        return {
          nombre: user.nombre,
          contraseña: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }),
    );

    await queryInterface.bulkInsert('usuario', seededUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuario', null, {});
  },
};
