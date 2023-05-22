module.exports = (sequelize, DataTypes) => {
  const aula = sequelize.define(
    'aula',
    {
      nroAula: DataTypes.INTEGER,
    },
    { tableName: 'aula' },
  );
  aula.associate = function (models) {
    aula.belongsTo(models.Materia);
  };
  return aula;
};
