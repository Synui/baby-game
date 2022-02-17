const router = require('express').Router();

const postRoutes = require('./post-routes');
const momRoutes = require('./mom-routes');
const guestRoutes = require('./guest-routes');

router.use('/posts', postRoutes);
router.use('/moms', momRoutes);
router.use('/guests', guestRoutes);

module.exports = router;