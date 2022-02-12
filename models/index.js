const Post = require("./Post");

// create associations
USER.hasMany(Post, {
    foreignKey: 'user_id'
});

module.exports = { Post };