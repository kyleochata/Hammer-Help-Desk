const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Log = require('./Log');

class Ticket extends Model {}

Ticket.prototype.logChange = async function(userId) {
  const changes = findDiff(this.dataValues, this._previousDataValues);

  if (!changes.length) return;  // Return early if no changes

  const logValues = {
    type: 'Modified',
    message: `${changes.length} changes were made on ${new Date().toISOString()} by user. ${changes.join(' ')}`,
    userId: userId,
    ticketId: this.id
  };

  try {
    const log = await Log.create(logValues);
    console.log('Log record created:', log);
  } catch (err) {
    console.error('Error creating Log record:', err);
  }
}


Ticket.init(
  {
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    techId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Open', 'Pending', 'Resolved', 'Claimed'),
      allowNull: false,
      defaultValue: 'Open',
    },
    urgency: {
      type: DataTypes.ENUM('Low', 'Medium', 'High'),
      allowNull: false,
      defaultValue: 'Low',
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 'false',
    }
},
{
  hooks: {
    afterCreate: async (ticket, options) => {
      const logValues = {
        type: 'Created',
        message: 'Ticket number ${ticket.id} created.',
        userId: ticket.clientId,
        ticketId: ticket.id,
      };
      try {
      const log = await Log.create(logValues, { transaction: options.transaction })
        console.log('Log record created:', log)
    } catch (err) {
      console.error(err);
    }
    },
    afterUpdate: async (ticket, options) => {
      const previousStatus = ticket._previousDataValues.status;
      if (previousStatus !== 'Resolved' && ticket.status === 'Resolved') {
        try {
          await ticket.update({ isArchived: true }, { transaction: options.transaction});
          console.log(`Ticket ${ticket.id} has been resolved and archived.`)
        } catch(err) {
          console.error('Error creating Log record:', err);
        }
      }
    }
  },
  sequelize,
  freezeTableName: true,
  underscored: false,
  modelName: 'ticket'
}
);

module.exports = Ticket;