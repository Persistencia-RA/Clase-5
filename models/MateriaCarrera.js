module.exports = (sequelize, DataTypes) => {
  const materiacarrera = sequelize.define(
    'materiacarrera',
    {
      materiaId: DataTypes.INTEGER,
      carreraId: DataTypes.INTEGER,
    },
    { tableName: 'materiacarrera' },
  );

  // Definición de las asociaciones con otros modelos
  materiacarrera.associate = function (models) {
    materiacarrera.belongsTo(models.materia); // Relación de pertenencia (materiacarrera pertenece a una materia)
    materiacarrera.belongsTo(models.carrera); // Relación de pertenencia (materiacarrera pertenece a una carrera)
  };

  return materiacarrera;
};
