'use strict';
module.exports = (sequelize, DataTypes) => {
  const aula = sequelize.define(
    'aula',
    {
      numero_lab: DataTypes.INTEGER,
    },
    {},
  );

  return aula;
};
