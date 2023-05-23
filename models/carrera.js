module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define(
    'carrera',
    {
      nombre: DataTypes.STRING,
    },
    { tableName: 'carrera' },
  );
  carrera.associate = function (models) {
    carrera.belongsToMany(models.materia, {
      through: models.materiacarrera,
      foreignKey: 'carreraId',
    });
    carrera.hasMany(models.alumno);
  };
  return carrera;
};
