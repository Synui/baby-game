const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Mom model
class Mom extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Mom.init(
    {
        // unique id per mom
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // mom's own name
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // mom's own email
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // mom's own password
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 16]
            }
        }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newMomData) {
                newMomData.password = await bcrypt.hash(newMomData.password, 10);
                return newMomData;
            },

            async beforeUpdate(updatedMomData) {
                updatedMomData.password = await bcrypt.hash(updatedMomData.password, 10);
                return updatedMomData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'mom'
    }
);

module.exports = Mom;