module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define(
    'carrera',
    {
      nombre: DataTypes.STRING,
    },
    { tableName: 'carrera' },
  );

  // Definición de las asociaciones con otros modelos
  carrera.associate = function (models) {
    // Relación muchos a muchos con el modelo 'materia' a través del modelo 'materiacarrera'
    carrera.belongsToMany(models.materia, {
      through: models.materiacarrera, // Utiliza el modelo 'materiacarrera' como tabla intermedia
      foreignKey: 'carreraId', // Clave foránea en la tabla intermedia para la asociación con 'carrera'
    });

    carrera.hasMany(models.alumno); // Relación uno a muchos, donde una carrera puede tener muchos alumnos
  };

  return carrera;
};
