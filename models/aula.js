module.exports = (sequelize, DataTypes) => {
  const aula = sequelize.define(
    'aula',
    {
      numero_lab: DataTypes.INTEGER,
    },
    { tableName: 'aula' },
  );

  return aula;
};
