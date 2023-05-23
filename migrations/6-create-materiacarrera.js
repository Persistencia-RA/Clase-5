module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('materiaCarrera', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      carreraId: {
        type: Sequelize.INTEGER,
      },
      materiaId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('materiaCarrera');
  },
};
