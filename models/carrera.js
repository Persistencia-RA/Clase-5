module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define(
    'carrera',
    {
      nombre: DataTypes.STRING,
    },
    { tableName: 'carrera' },
  );
  carrera.associate = function (models) {
    carrera.hasMany(models.materia);
  };
  return carrera;
};
