var express = require('express');
var router = express.Router();
var post_controller = require('../controllers/postController');
var user_controller = require('../controllers/userController');

/* GET posts listing. */
router.get('/', user_controller.user_verify_loggedin, post_controller.post_list);

// POST Create post
router.post('/create', user_controller.user_verify_loggedin, post_controller.post_create_post);

// UPDATE post by id
// DELETE post by id
router.post('/:id/delete', user_controller.user_verify_loggedin, user_controller.user_verify_authorization, post_controller.post_delete_post);

// GET all comments for post
router.get('/:id/comments', user_controller.user_verify_loggedin, post_controller.post_comments_get);

// GET latest public post
router.get('/latest', user_controller.user_verify_loggedin, post_controller.post_get_latest);

// GET post by id
router.get('/:id', user_controller.user_verify_loggedin, post_controller.post_get);

module.exports = router;
