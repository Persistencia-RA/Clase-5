module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define(
    'profesor',
    {
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
    },
    { tableName: 'profesor' },
  );
  profesor.associate = function (models) {
    profesor.hasMany(models.materia);
  };

  return profesor;
};
