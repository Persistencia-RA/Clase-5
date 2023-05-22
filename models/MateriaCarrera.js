module.exports = (sequelize, DataTypes) => {
  const MateriaCarrera = sequelize.define(
    'MateriaCarrera',
    {},
    { tableName: 'MateriaCarrera' },
  );
  MateriaCarrera.associate = function (models) {
    MateriaCarrera.belongsTo(models.Carrera);
    MateriaCarrera.belongsTo(models.Materia);
  };
  return MateriaCarrera;
};
