// assign post routes to the express router
const router = require('express').Router();

const postRoutes = require('./post-routes');
const momRoutes = require('./mom-routes');
const guestRoutes = require('./guest-routes');
const answersRoutes = require('./answers-routes');


router.use('/posts', postRoutes);
router.use('/moms', momRoutes);
router.use('/guests', guestRoutes);
router.use('/answers', answersRoutes);


module.exports = router;