module.exports = (sequelize, DataTypes) => {
  const nota = sequelize.define(
    'Nota',
    {
      notaPrimerParcial: DataTypes.INTEGER,
      notaSegundoParcial: DataTypes.INTEGER,
    },
    { tableName: 'Nota' },
  );
  nota.associate = function (models) {
    nota.belongsTo(models.materia);
    nota.belongsTo(models.alumno);
  };
  return nota;
};
