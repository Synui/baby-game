const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Mom, Guest } = require('../models');
// const withAuth = require('../utils/auth');

// withAuth authguards non-loggedIn people from creating posts
// GET all post by user in dashboard - /dashboard
router.get('/', (req, res) => {
    // Post.findAll({
    //     where: {
    //       // use the ID from the session
    //       mom_id: req.session.mom_id,
    //       guest_id: req.session.guest_id
    //     },
    //     attributes: [
    //       'id'
    //     ],
    //     include: [
    //       {
    //         model: Mom,
    //         attributes: [
    //             'id', 
    //             'name', 
    //           ]
    //       },
    //       {
    //           model: Guest,
    //           attributes: [
    //               'id',
    //               'name'
    //           ]
    //       }
    //     ]
    //   })
    //     .then(dbPostData => {
    //       // serialize data before passing to template
    //       const posts = dbPostData.map(post => post.get({ plain: true }));
          res.render('dashboard', { 
              loggedIn: true 
          });
        // })
        // .catch(err => {
        //   console.log(err);
        //   res.status(500).json(err);
        // });
    // });
        });

module.exports = router;