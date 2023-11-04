var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');

router.get('/', (req, res, next) => {
	res.redirect('/messageboard');
});

router.get('/login', (req, res, next) => {
	res.redirect(req.session.returnTo);
});

router.post('/login', user_controller.user_authenticate_post);

router.post('/logout', user_controller.user_logout_post);

module.exports = router;
