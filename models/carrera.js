module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define(
    'carrera',
    {
      nombre: DataTypes.STRING,
    },
    {},
  );
  carrera.associate = function (models) {
    // asociación con modelo materia
    carrera.hasMany(models.materia, {
      foreignKey: 'id_carrera',
      as: 'materias',
    });
  };
  return carrera;
};
