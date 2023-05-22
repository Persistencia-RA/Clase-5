module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define(
    'Alumno',
    {
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
    },
    { tableName: 'Alumno' },
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
