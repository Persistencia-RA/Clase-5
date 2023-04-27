'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define(
    'materia',
    {
      id_carrera: DataTypes.INTEGER,
      nombre: DataTypes.STRING,
    },
    {},
  );
  materia.associate = function (models) {
    // associations can be defined here
    materia.belongsTo(models.carrera, {
      as: 'Materia-Relacionado',
      foreignKey: 'id_carrera',
    });
  };

  return materia;
};
