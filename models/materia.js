module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define(
    'materia',
    {
      id_carrera: DataTypes.INTEGER,
      nombre: DataTypes.STRING,
    },
    { tableName: 'materia' },
  );
  materia.associate = function (models) {
    materia.belongsTo(models.carrera, {
      foreignKey: 'id_carrera',
      as: 'carrera',
    });
  };

  return materia;
};
