const express  = require('express')
const router =express.Router();
const PostController = require('../Controllers/PostController')

router.post('/',PostController.createPost);
router.get('/:id',PostController.getPost)
router.put('/:id', PostController.updatePost)
router.delete('/:id',PostController.deletePost)
router.put('/:id/like',PostController.likes)
router.get('/:id/getTimelinePost',PostController.getTimelinePosts)
module.exports =router;

