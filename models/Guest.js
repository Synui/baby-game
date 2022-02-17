const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Guest model
class Guest extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Guest.init(
    {
        // unique id per guest
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // guest's own name
        name: {
            type: DataTypes.STRING,
            isAdmin: true,
            allowNull: false
        },
        // guest's own email
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // guest's own password
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 16]
            }
        },
        mom_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            references: {
                model: 'mom',
                key: 'email'
            }
        },
        mom_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'mom',
                key: 'id'
            }
        }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newGuestData) {
                newGuestData.password = await bcrypt.hash(newGuestData.password, 10);
                return newGuestData;
            },

            async beforeUpdate(updatedGuestData) {
                updatedGuestData.password = await bcrypt.hash(updatedGuestData.password, 10);
                return updatedGuestData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'guest'
    }
);

module.exports = Guest;