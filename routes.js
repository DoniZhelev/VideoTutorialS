const router = require('express').Router();

const isAuth = require('./middlewares/isAuth')

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const courseController = require('./controllers/courseController');

router.use('/', homeController);
router.use('/', authController);
router.use('/course', isAuth, courseController);


module.exports = router;