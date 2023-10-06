const User = require('./User');
const Ticket = require('./Ticket');
const Log = require('./Log');

User.hasMany(Ticket, {
  foreignKey: 'clientId',
  as: 'client'
})

User.hasMany(Ticket, {
  foreignKey: 'techId',
  as: 'tech'
})

Ticket.belongsTo(User, {
  foreignKey: 'clientId',
  as: 'client'
})

Ticket.belongsTo(User, {
  foreignKey: 'techId',
  as: 'tech'
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