const express = require('express');
const router = express.Router();
console.log(`router`)
router.use('/users',require('./users'));
router.use('/posts',require('./post'));
router.use('/comments',require('./comment'));
const passport = require('passport')



const homeController = require('../controllers/homeController')
router.get('/',passport.checkAuthentication,homeController.home);

module.exports = router;