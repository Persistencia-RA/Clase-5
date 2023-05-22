module.exports = (sequelize, DataTypes) => {
  const aula = sequelize.define(
    'Aula',
    {
      nroAula: DataTypes.INTEGER,
    },
    { tableName: 'Aula' },
  );
  aula.associate = function (models) {
    aula.belongsTo(models.materia);
  };
  return aula;
};
