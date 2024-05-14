const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Service', {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    typeOfService: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};
