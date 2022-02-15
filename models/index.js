const Post = require("./Post");
const Vote = require("./Vote");
const User = require("./User")

// create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// if we change Post to Mom then users belong to one mom
User.belongsToOne(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});


Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});


Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Questions, {
    foreignKey: 'post_id'
});


module.exports = {  User, Post, Vote };
