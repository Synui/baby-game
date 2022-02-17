const router = require('express').Router();

const momPage = require('./make-vote-page-routes.js');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/mom-page', momPage);
router.use('/api', apiRoutes);
router.use('/', homeRoutes)

module.exports = router;