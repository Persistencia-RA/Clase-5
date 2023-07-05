module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define(
    'materia',
    {
      nombre: DataTypes.STRING,
    },
    { tableName: 'materia' },
  );

  // Definición de las asociaciones con otros modelos
  materia.associate = function (models) {
    // Relación muchos a muchos con el modelo 'alumno' a través del modelo 'nota'
    materia.belongsToMany(models.alumno, {
      through: models.nota, // Utiliza el modelo 'nota' como tabla intermedia
      foreignKey: 'materiaId', // Clave foránea en la tabla intermedia para la asociación con 'materia'
    });

    // Relación muchos a muchos con el modelo 'carrera' a través del modelo 'materiacarrera'
    materia.belongsToMany(models.carrera, {
      through: models.materiacarrera, // Utiliza el modelo 'materiacarrera' como tabla intermedia
      foreignKey: 'materiaId', // Clave foránea en la tabla intermedia para la asociación con 'materia'
    });

    materia.belongsTo(models.aula); // Relación de pertenencia (materia pertenece a un aula)
    materia.belongsTo(models.profesor); // Relación de pertenencia (materia pertenece a un profesor)
  };

  return materia;
};
