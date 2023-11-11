var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', user_controller.user_verify, user_controller.user_list);

// POST Create User
router.post('/create', user_controller.user_verify, user_controller.user_create_post);

// GET posts for user
router.get('/:id/posts', user_controller.user_verify, user_controller.user_get_posts);

// UPDATE user by id
// DELETE user by id
router.post('/:id/delete', user_controller.user_verify, user_controller.user_delete_post);

// GET user by id
router.get('/:id', user_controller.user_verify, user_controller.user_get);

module.exports = router;
