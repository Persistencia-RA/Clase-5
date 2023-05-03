'use strict';
module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define(
    'profesor',
    {
      id_materia: DataTypes.INTEGER,
      id_aula: DataTypes.INTEGER,
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
    },
    {},
  );
  profesor.associate = function (models) {
    // asociación con modelo carrera
    profesor.belongsTo(models.materia, {
      foreignKey: 'id_materia',
      as: 'materia',
    });
    profesor.belongsTo(models.aula, {
      foreignKey: 'id_aula',
      as: 'aula',
    });
  };

  return profesor;
};
