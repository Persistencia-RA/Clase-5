module.exports = (sequelize, DataTypes) => {
  const nota = sequelize.define(
    'nota',
    {
      id_alumno: DataTypes.INTEGER,
      id_materia: DataTypes.INTEGER,
      calificacion: DataTypes.INTEGER,
    },
    { tableName: 'nota' },
  );
  nota.associate = function (models) {
    nota.belongsTo(models.alumno, {
      foreignKey: 'id_alumno',
      as: 'alumno',
    });
    nota.belongsTo(models.materia, {
      foreignKey: 'id_materia',
      as: 'materia',
    });
  };

  return nota;
};
