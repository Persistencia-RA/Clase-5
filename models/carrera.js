module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define(
    'Carrera',
    {
      nombre: DataTypes.STRING,
    },
    { tableName: 'Carrera' },
  );
  carrera.associate = function (models) {
    carrera.belongsToMany(models.materia, {
      through: models.materiaCarrera,
      foreignKey: 'carreraId',
    });
  };
  return carrera;
};
