var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', user_controller.user_list);

// GET Create User Form
router.get('/create', user_controller.user_create_get);

// POST Create User
router.post('/create', user_controller.user_create_post);

// GET user by id
// UPDATE user by id
// DELETE user by id

module.exports = router;
