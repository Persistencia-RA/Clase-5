module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Nota', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      alumnoId: {
        type: Sequelize.INTEGER,
      },
      materiaId: {
        type: Sequelize.INTEGER,
      },
      notaPrimerParcial: {
        type: Sequelize.INTEGER,
      },
      notaSegundoParcial: {
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
    return queryInterface.dropTable('Nota');
  },
};
