const express = require('express');
const router = express.Router();
const AuthController =require('../Controllers/AuthController')



router.post('/register',AuthController.registerUser)
router.post('/login',AuthController.toLogin)


module.exports =router;