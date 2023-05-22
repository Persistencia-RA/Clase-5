module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define(
    'Materia',
    {
      nombre: DataTypes.STRING,
    },
    { tableName: 'Materia' },
  );
  materia.associate = function (models) {
    materia.belongsTo(models.carrera);
    materia.belongsToMany(models.alumno, {
      through: models.nota,
      foreignKey: 'materiaId',
    });
    materia.belongsToMany(models.carrera, {
      through: models.materiaCarrera,
      foreignKey: 'materiaId',
    });
  };
  return materia;
};
