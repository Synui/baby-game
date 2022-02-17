const Post = require('./Post');
const Mom = require('./Mom');
const Guest = require('./Guest');

// create associations
Mom.hasMany(Post, {
    foreignKey: 'mom_id'
});

Mom.hasMany(Guest, {
    foreignKey: 'mom_id'
});

Post.belongsTo(Mom, {
    foreignKey: 'mom_id'
});
 Post.hasMany(Guest, {
     foreignKey: 'mom_id'
 });

Guest.belongsTo(Mom, {
    foreignKey: 'mom_id'
});

Guest.belongsTo(Post, {
    foreignKey: 'mom_id'
})

module.exports = { Post, Mom, Guest };