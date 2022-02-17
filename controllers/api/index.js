// assign post routes to the express router
const router = require('express').Router();

const postRoutes = require('./post-routes');
const userRoutes = require('./mom-routes');
const guestRoutes = require('./guest-routes');
const answersRoutes = require('./answers-routes');


router.use('/posts', postRoutes);
router.use('/moms', userRoutes);
router.use('/guests', guestRoutes);
router.use('/answers', answersRoutes);


module.exports = router;