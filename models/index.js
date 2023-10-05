const User = require('./User');
const Ticket = require('./Ticket');
const Log = require('./Log');

User.hasMany(Ticket, {
  foreignKey: 'clientId'
})

User.hasMany(Ticket, {
  foreignKey: 'techId'
})

Ticket.belongsTo(User, {
  foreignKey: 'clientId'
})

Ticket.belongsTo(User, {
  foreignKey: 'techId'
})

User.hasMany(Log, {
  foreignKey: 'userId'
})

Log.belongsTo(User, {
  foreignKey: 'userId'
})

Ticket.hasMany(Log, {
  foreignKey: 'ticketId'
})

Log.belongsTo(Ticket, {
  foreignKey: 'ticketId'
})


module.exports = { User, Ticket, Log }