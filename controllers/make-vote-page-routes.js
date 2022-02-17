// const router = require('express').Router();
// const { Post, Mom, Guest } = require('../models');
// // // const withAuth = require('../utils/auth');

// // withAuth authguards non-loggedIn people from creating posts
// // GET one mom on mom-page - /mom-page/:id
// router.get('/:id', (req, res) => {
//     Post.findAll({
//       where: {
//         // use the ID from the session
//         user_id: req.session.user_id
//       },
//       attributes: [
//         'id'
//       ],
//       include: [
//         {
//           model: Mom,
//           attributes: [
//               'id', 
//               'name', 
//             ]
//         },
//         {
//             model: Guest,
//             attributes: [
//                 'id',
//                 'name'
//             ]
//         }
//       ]
//     })
//       .then(dbPostData => {
//         // serialize data before passing to template
//         const posts = dbPostData.map(post => post.get({ plain: true }));
//         res.render('make-vote-page', { 
//             posts, 
//             loggedIn: true 
//         });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

//   module.exports = router;