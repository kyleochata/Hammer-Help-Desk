const router = require('express').Router();
// const handlebarsRoutes = require('./handlebarsRoutes');
const apiRoutes = require('./apiRoutes');

// router.use('/', handlebarsRoutes);
router.use('/api', apiRoutes);

module.exports = router;