const Post = require('./Post');
const Mom = require('./Mom');
const Guest = require('./Guest');
const Answers = require('./Answers');

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

// Post.hasMany(Guest, {
//      foreignKey: 'mom_id'
//  });
 
Guest.hasOne(Answers, {
    foreignKey: 'guest_id'
});

Guest.belongsTo(Mom, {
    foreignKey: 'mom_id'
});

Guest.belongsTo(Post, {
    foreignKey: 'mom_id'
});

Answers.belongsTo(Guest, {
    foreignKey: 'guest_id'
});

module.exports = { Post, Mom, Guest, Answers };