const sequelize = require('./connection');
const seedUser = require('./seedData/userData');
const seedLog = require('./seedData/logData');
const seedTicket = require('./seedData/ticketData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUser();
  await seedTicket();
  await seedLog();

  process.exit(0);
}

seedAll();