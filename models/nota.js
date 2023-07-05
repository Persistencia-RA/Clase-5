module.exports = (sequelize, DataTypes) => {
  const nota = sequelize.define(
    'nota',
    {
      notaPrimerParcial: DataTypes.INTEGER,
      notaSegundoParcial: DataTypes.INTEGER,
    },
    { tableName: 'nota' },
  );

  // Definición de las asociaciones con otros modelos
  nota.associate = function (models) {
    nota.belongsTo(models.materia); // Relación de pertenencia (nota pertenece a una materia)
    nota.belongsTo(models.alumno); // Relación de pertenencia (nota pertenece a un alumno)
  };

  return nota;
};
