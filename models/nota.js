module.exports = (sequelize, DataTypes) => {
  const nota = sequelize.define(
    'nota',
    {
      notaPrimerParcial: DataTypes.INTEGER,
      notaSegundoParcial: DataTypes.INTEGER,
    },
    { tableName: 'nota' },
  );
  nota.associate = function (models) {
    nota.belongsTo(models.Materia);
    nota.belongsTo(models.Alumno);
  };
  return nota;
};
