const express =require('express');
const router= express.Router();
const  UserController  = require('../Controllers/UserController');
//const { default: authMiddleWare } = require('../Middleware/AuthMiddleware');
//const authMiddleWare= require('../Middleware/AuthMiddleware');


router.get('/',UserController.getAllUsers)
router.get('/:id',UserController.getUser);
router.put('/:id',UserController.upDateUser);
router.delete('/:id',UserController.deleteUser);
router.put('/:id/follow',UserController.followUser);
router.put('/:id/unfollow',UserController.UnfollowUser)


module.exports =router;