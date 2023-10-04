const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/connectioin');

class Log extends Model { };

Log.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ticket',
        key: 'id',
      }
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('Created', 'Modified', 'Message'),
      allowNull: false,
      defaultValue: 'Message',
    },
    isHidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'log'
  }
);

module.exports = Log;