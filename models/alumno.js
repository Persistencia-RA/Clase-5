module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define(
    'alumno',
    {
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
    },
    { tableName: 'alumno' }, // Nombre de la tabla en la base de datos: 'alumno'
  );

  // Definición de las asociaciones con otros modelos
  alumno.associate = function (models) {
    // Relación muchos a muchos con el modelo 'materia' a través del modelo 'nota'
    alumno.belongsToMany(models.materia, {
      through: models.nota, // Utiliza el modelo 'nota' como tabla intermedia
      foreignKey: 'alumnoId', // Clave foránea en la tabla intermedia para la asociación con 'alumno'
    });

    alumno.belongsTo(models.carrera);
  };

  return alumno;
};
