module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define(
    'profesor',
    {
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
    },
    { tableName: 'profesor' },
  );

  // Definición de la asociación con otro modelo
  profesor.associate = function (models) {
    profesor.hasMany(models.materia); // Relación uno a muchos, donde un profesor puede tener muchas materias asociadas
  };

  return profesor;
};
