const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Answers extends Model {};

Answers.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        gender: {
            type: DataTypes.STRING,
            VARCHAR: [5],
            allowNull: false,
        },
        weight_in_pounds: {
            type: DataTypes.DECIMAL(3,3),
            allowNull:false
        },
        date_of_birth: {
            type: DataTypes.DATE,
            allow_invalid_dates: true,
            allowNull: false
        },
        guest_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'guest',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'answers'
    }
);

module.exports = Answers;