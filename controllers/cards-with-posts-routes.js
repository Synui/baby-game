const router = require('express').Router();
const { Guest, Answers } = require('../models');
/// const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  Answers.findAll({
    where: {
      id: req.session.id
    },
    attributes: [
      'id',
      'gender',
      'weight_in_pounds',
      'date_of_birth'
    ],
    include: [
      {
        model: Guest,
        attributes: [
          'id',
          'name'
        ]
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('cards-with-posts', {
        posts,
        name: req.body.name,
        gender: req.body.gender,
        weight_in_pounds: req.body.weight_in_pounds,
        date_of_birth: req.body.bate_of_birth,
        loggedIn: true
      });
    });
});

module.exports = router;