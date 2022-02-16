const Post = require('./Post');
const Mom = require('./Mom');
const Guest = require('./Guest');

// create associations
Mom.hasMany(Post, {
    foreignKey: 'mom_id'
});

Post.belongsTo(Mom, {
    foreignKey: 'mom_id',
});

Guest.belongsTo(Mom, {
    foreignKey: 'mom_id'
})

module.exports = { Post, Mom };