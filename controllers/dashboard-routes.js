const router = require('express').Router();
const { Post, Mom, Guest } = require('../models');
// const withAuth = require('../utils/auth');

// withAuth authguards non-loggedIn people from creating posts
// GET all post by user in dashboard - /dashboard
router.get('/', (req, res) => {
    Post.findAll({
        where: {
          // use the ID from the session
          mom_id: req.session.mom_id,
          guest_id: req.session.guest_id
        },
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
          // serialize data before passing to template
          const posts = dbPostData.map(post => post.get({ plain: true }));
          res.render('/dashboard', { 
              posts, 
              loggedIn: true 
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });


  // GET post by post id in order to edit post - /dashboard/edit/(unique id)
//   router.get('/edit/:id', withAuth, (req, res) => {
//     Post.findByPk(req.params.id, {
//       attributes: [
//         'id',
//         'title',
//         'content',
//         'created_at',
//       ],
//       include: [
//         {
//           model: Comment,
//           attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//           include: {
//             model: User,
//             attributes: ['username']
//           }
//         },
//         {
//           model: User,
//           attributes: ['username']
//         }
//       ]
//     })
//       .then(postInfo => {
//         if (postInfo) {
//           const post = postInfo.get({ plain: true });
          
//           res.render('edit-post', {
//             post,
//             loggedIn: true
//           });
//         } else {
//           res.status(404).end();
//         }
//       })
//       .catch(err => {
//         res.status(500).json(err);
//       });
//   });

module.exports = router;