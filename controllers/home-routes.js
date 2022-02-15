// const router = require('express').Router();
// const { User } = require('../models');

// // GET all posts on homepage - /
// router.get('/', (req, res) => {
//   User.findAll({
//       attributes: { 
//           exclude: ['password'] 
//       }
//   })
//   .then(dbUserData => res.json(dbUserData))
//   .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//   });
// });


// router.get('/:id', (req, res) => {
//     User.findOne({
//       where: {
//         email: req.params.email
//       },
//       attributes: [
//         'email',
//         'name',
//         'id'
//       ]
//     })
//       .then(dbUserData => {
//         if (!dbUserData) {
//           res.status(404).json({ message: 'No user found with this email' });
//           return;
//         }
//         // serialize the data
//         // const post = dbUserData.get({ plain: true });
  
//         // pass data to template
//         // res.render('single-post', {
//         //     post,
//         //     loggedIn: req.session.loggedIn
//         //   });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

// router.get('/login', (req, res) => {
//     if (req.session.loggedIn) {
//       res.redirect('/');
//       return;
//     }
  
//     res.render('login');
//   });

// module.exports = router;