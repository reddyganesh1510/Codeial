const express = require('express');
const router = express.Router();
console.log(`router`)
router.use('/users',require('./users'));
router.use('/posts',require('./post'));
router.use('/comments',require('./comment'));



const homeController = require('../controllers/homeController')
router.get('/',homeController.home);

module.exports = router;