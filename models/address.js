const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Address', {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    homeAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    workAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
