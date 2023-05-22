module.exports = (sequelize, DataTypes) => {
  const materiaCarrera = sequelize.define(
    'MateriaCarrera',
    {},
    { tableName: 'MateriaCarrera' },
  );
  materiaCarrera.associate = function (models) {
    materiaCarrera.belongsTo(models.carrera);
    materiaCarrera.belongsTo(models.materia);
  };
  return materiaCarrera;
};
