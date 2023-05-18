module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define(
    'materia',
    {
      nombre: DataTypes.STRING,
    },
    { tableName: 'materia' },
  );
  materia.associate = function (models) {
    materia.belongsTo(models.carrera);
    materia.belongsToMany(models.alumno, {
      through: models.nota,
      foreignKey: 'materiaId',
    });
  };
  return materia;
};
