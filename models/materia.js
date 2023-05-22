module.exports = (sequelize, DataTypes) => {
  const Materia = sequelize.define(
    'Materia',
    {
      nombre: DataTypes.STRING,
    },
    { tableName: 'Materia' },
  );
  Materia.associate = function (models) {
    Materia.belongsTo(models.Carrera);
    Materia.belongsToMany(models.Alumno, {
      through: models.Nota,
      foreignKey: 'materiaId',
    });
    Materia.belongsToMany(models.Carrera, {
      through: models.MateriaCarrera,
      foreignKey: 'materiaId',
    });
  };
  return Materia;
};
