module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define(
    'carrera',
    {
      nombre: DataTypes.STRING,
    },
    { tableName: 'carrera' },
  );

  return carrera;
};
