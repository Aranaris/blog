var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', user_controller.user_list);

// GET Create User Form
router.get('/create', user_controller.user_create_get);

// POST Create User
router.post('/create', user_controller.user_create_post);

// UPDATE user by id
// DELETE user by id
router.post('/:id/delete', user_controller.user_delete_post);

// GET user by id

module.exports = router;
