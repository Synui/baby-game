const router = require('express').Router();
const { Post, Mom, Guest } = require('../models');

// GET all posts on homepage - /
router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        attributes: [
            'id',
            'title'
        ],
        include: [
            {
              model: Mom,
              attributes: [
                  'id', 
                  'name', 
                ]
            },
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
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
              });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/mom-login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('mom-sign-in');
  });

  router.get('/guest-login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('dashboard');
      return;
    }
  
    res.render('guest-sign-in');
  });

  router.get('/mom-register', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('mom-register');
  });

  router.get('/guest-register', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('guest-register');
  });

  module.exports = router;