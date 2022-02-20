const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create post model
class Post extends Model {}

// create fields/columns for Post model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        mom_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'mom',
                key: 'id'
            }
        },
        mom_email: {
            type: DataTypes.STRING,
            references: {
                model: 'mom',
                key: 'email'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;