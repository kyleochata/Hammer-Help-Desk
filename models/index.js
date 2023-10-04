const User = require('./User');
const Ticket = require('./Ticket');
const Log = require('./Log');

User.hasMany(Ticket, {
  foreignKey: 'clientId'
})

User.hasMany(Ticket, {
  foreignKey: 'techId'
})

User.hasMany(Log, {
  foreignKey: 'userId'
})

Ticket.hasMany(Log, {
  foreignKey: 'ticketId'
})

Ticket.belongsTo(User, {
  foreignKey: 'clientId'
})

Ticket.belongsTo(User, {
  foreignKey: 'techId'
})

Log.belongsTo(Ticket, {
  foreignKey: 'ticketId'
})

Log.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = { User, Ticket, Log }