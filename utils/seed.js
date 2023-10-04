const sequelize = require('./connection');
console.log(sequelize)
const seedUsers = require('./seedData/userData');
const seedLog = require('./seedData/logData');
const seedTickets = require('./seedData/ticketData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedTickets();
  await seedLog();

  process.exit(0);
}

seedAll();