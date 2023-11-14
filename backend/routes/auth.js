var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');

router.post('/login', user_controller.user_authenticate_post);

router.post('/logout', user_controller.user_verify_authorization, user_controller.user_logout_post);

module.exports = router;
