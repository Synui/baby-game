const router = require('express').Router();

const userRoutes = require('./post-routes');

router.use('/posts', postRoutes);

module.exports = router;