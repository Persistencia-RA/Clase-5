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
    // asociación con modelo carrera
    materia.belongsTo(models.carrera, {
      foreignKey: 'id_carrera',
      as: 'carrera',
    });
  };

  return materia;
};
