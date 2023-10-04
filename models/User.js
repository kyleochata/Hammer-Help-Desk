const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../utils/connection');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6],
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM,
            values: ['tech', 'client'],
            defaultValue: 'client',
            allowNull: false,
        },
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                newUserData.email = newUserData.email.toLowerCase();
                return newUserData;
            },
            async beforeBulkCreate(bulkUserData) {
                for (const user of bulkUserData) {
                    user.password = await bcrypt.hash(user.password, 10);
                    user.email = user.email.toLowerCase();
                }
                return bulkUserData
            }
        },


        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        modelName: 'user',
    }
)

module.exports = User