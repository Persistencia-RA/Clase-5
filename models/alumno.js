module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define(
    'alumno',
    {
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
    },
    { tableName: 'alumno' },
  );
  alumno.associate = function (models) {
    alumno.belongsToMany(models.materia, {
      through: models.nota,
      foreignKey: 'alumnoId',
    });
    alumno.belongsTo(models.carrera);
  };
  return alumno;
};
