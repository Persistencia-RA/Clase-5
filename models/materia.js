module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define(
    'materia',
    {
      nombre: DataTypes.STRING,
    },
    { tableName: 'materia' },
  );
  materia.associate = function (models) {
    materia.belongsToMany(models.alumno, {
      through: models.nota,
      foreignKey: 'materiaId',
    });
    materia.belongsToMany(models.carrera, {
      through: models.materiacarrera,
      foreignKey: 'materiaId',
    });
    materia.belongsTo(models.aula);
    materia.belongsTo(models.profesor);
  };
  return materia;
};
