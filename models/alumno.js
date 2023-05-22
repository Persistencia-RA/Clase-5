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
    alumno.belongsToMany(models.Materia, {
      through: models.Nota,
      foreignKey: 'alumnoId',
    });
    alumno.belongsTo(models.Carrera);
  };
  return alumno;
};
