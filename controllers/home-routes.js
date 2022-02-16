const router = require('express').Router();
const { Mom } = require('../models');

// GET all posts on homepage - /
router.get('/', (req, res) => {
  Mom.findAll({
      attributes: { 
          exclude: ['password'] 
      }
  })
  .then(dbMomData => res.json(dbMomData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});


router.get('/:id', (req, res) => {
    Mom.findOne({
      where: {
        email: req.params.email
      },
      attributes: [
        'email',
        'name',
        'id'
      ]
    })
      .then(dbMomData => {
        if (!dbMomData) {
          res.status(404).json({ message: 'No mom found with this email' });
          return;
        }
        // serialize the data
        const post = dbMomData.get({ plain: true });
  
        // pass data to template
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

module.exports = router;