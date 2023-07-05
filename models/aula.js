module.exports = (sequelize, DataTypes) => {
  const aula = sequelize.define(
    'aula',
    {
      nroAula: DataTypes.INTEGER,
    },
    { tableName: 'aula' },
  );

  // Definición de la asociación con otro modelo
  aula.associate = function (models) {
    aula.hasMany(models.materia); // Relación uno a muchos, donde un aula puede tener muchas materias
  };

  return aula;
};
