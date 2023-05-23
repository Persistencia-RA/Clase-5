module.exports = (sequelize, DataTypes) => {
  const materiacarrera = sequelize.define(
    'materiacarrera',
    {
      materiaId: DataTypes.INTEGER,
      carreraId: DataTypes.INTEGER,
    },
    { tableName: 'materiacarrera' },
  );
  materiacarrera.associate = function (models) {
    materiacarrera.belongsTo(models.materia);
    materiacarrera.belongsTo(models.carrera);
  };
  return materiacarrera;
};
