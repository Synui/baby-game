const router = require('express').Router();
const { } = require('../models');
/// const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('cards-with-posts');
});

module.exports = router;