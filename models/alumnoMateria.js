module.exports = (sequelize, DataTypes) => {
  const alumnomateria = sequelize.define(
    'alumnomateria',
    {
      notaPrimerParcial: DataTypes.INTEGER,
      notaSegundoParcial: DataTypes.INTEGER,
    },
    { tableName: 'alumnomateria' },
  );
  alumnomateria.associate = function (models) {
    alumnomateria.belongsTo(models.materia);
    alumnomateria.belongsTo(models.alumno);
  };
  return alumnomateria;
};
