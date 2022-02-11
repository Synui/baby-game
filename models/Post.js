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
        title: {
            
        }
    }
)