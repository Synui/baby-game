const router = require('express').Router();

const postRoutes = require('./post-routes');
const userRoutes = require('./mom-routes');
const guestRoutes = require('./guest-routes');

router.use('/posts', postRoutes);
router.use('/moms', userRoutes);
router.use('/guests', guestRoutes);

module.exports = router;