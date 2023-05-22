module.exports = (sequelize, DataTypes) => {
  const aula = sequelize.define(
    'aula',
    {
      numero_lab: DataTypes.INTEGER,
    },
    { tableName: 'aula' },
  );
  /*   aula.associate = function (models) {
    aula.hasMany(models.materia);
  }; */
  return aula;
};
