'use strict';
module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define(
    'alumno',
    {
      id_materia: DataTypes.INTEGER,
      id_aula: DataTypes.INTEGER,
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
    },
    {},
  );
  alumno.associate = function (models) {
    // asociación con modelo carrera
    alumno.belongsTo(models.materia, {
      foreignKey: 'id_materia',
      as: 'materia',
    });
    alumno.belongsTo(models.aula, {
      foreignKey: 'id_aula',
      as: 'aula',
    });
  };

  return alumno;
};