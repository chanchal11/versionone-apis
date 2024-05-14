const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const User = require('./user')(sequelize);
const Service = require('./service')(sequelize);
const Address = require('./address')(sequelize);

User.hasMany(Service, { foreignKey: 'userid' });
User.hasOne(Address, { foreignKey: 'userid' });

sequelize.sync();

module.exports = { sequelize, User, Service, Address };
