const router = require('express').Router();

const dashboardRoutes = require('./dashboard-routes.js');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const cardsRoutes = require('./cards-with-posts-routes')

router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/cards-with-posts', cardsRoutes);

module.exports = router;