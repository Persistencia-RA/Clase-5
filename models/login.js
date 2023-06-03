module.exports = (sequelize, DataTypes) => {
  const login = sequelize.define(
    'login',
    {
      usuartio: DataTypes.STRING,
      contraseña: DataTypes.STRING,
    },
    { tableName: 'login' },
  );
  return login;
};
