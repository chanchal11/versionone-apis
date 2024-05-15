const { sequelize, User, Service, Address } = require('./models');
const { faker } = require('@faker-js/faker');

const NUM_USERS = 100;
const NUM_SERVICES = 200;
const NUM_ADDRESSES = 100;

const createDummyData = async () => {
  await sequelize.sync({ force: true }); // This will drop the existing tables and recreate them

  // Generate users
  const users = [];
  for (let i = 0; i < NUM_USERS; i++) {
    users.push({
      name: faker.person.fullName(),
      profilePictureUrl: faker.image.avatar(),
    });
  }
  const createdUsers = await User.bulkCreate(users);

  // Generate services
  const services = [];
  for (let i = 0; i < NUM_SERVICES; i++) {
    services.push({
      userid: faker.helpers.arrayElement(createdUsers).id,
      typeOfService: faker.commerce.product(),
      startDate: faker.date.past(),
      expDate: faker.date.future(),
    });
  }
  await Service.bulkCreate(services);

  // Generate addresses
  const addresses = [];
  for (let i = 0; i < NUM_ADDRESSES; i++) {
    addresses.push({
      userid: faker.helpers.arrayElement(createdUsers).id,
      homeAddress: faker.address.streetAddress(),
      workAddress: faker.address.streetAddress(),
    });
  }
  await Address.bulkCreate(addresses);

  console.log('Dummy data has been created.');
};

createDummyData()
  .catch((err) => {
    console.error('Failed to create dummy data:', err);
  })
  .finally(() => {
    sequelize.close();
  });
