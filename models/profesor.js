module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define(
    'Profesor',
    {
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
    },
    { tableName: 'Profesor' },
  );
  profesor.associate = function (models) {
    profesor.belongsTo(models.materia, {
      foreignKey: 'materiaId',
      as: 'Materia',
    });
  };

  return profesor;
};
