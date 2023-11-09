const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

//display users
exports.user_list = asyncHandler(async(req, res, next) => {
	const allUsers = await User.find().sort({'username': 1}).exec();
	res.json(allUsers);
});

//create user functions
exports.user_create_get = asyncHandler(async(req, res, next) => {
	res.json('Create User GET not implemented');
});

exports.user_create_post = [
	body('username')
		.trim()
		.isLength({'min': 3})
		.withMessage('Username must be more than 2 characters.')
		.isAlphanumeric()
		.withMessage('Invalid characters.'),
	body('firstname')
		.trim()
		.isLength({'min': 1})
		.withMessage('First name must be specified.')
		.isAlphanumeric()
		.withMessage('Invalid characters.'),
	asyncHandler(async(req, res, next) => {
		const errors = validationResult(req);

		const user = new User({
			'username': req.body['username'],
			'firstname': req.body['firstname'],
			'password': req.body['password'],
		});
		console.log(user);
		if (!errors.isEmpty()){
			res.json({
				'errors': errors.array(),
			});
		} else {
			// await user.save();
			res.json(user);
		}
	})];

//update or remove user
exports.user_delete_post = asyncHandler(async(req, res, next) => {
	const user = await User.findById(req.params.id).exec();
	await User.findByIdAndRemove(req.params.id);
	res.json(user);
});

exports.user_get = asyncHandler(async(req, res, next) => {
	const user = await User.findById(req.params.id).exec();
	res.json(user);
});

//auth

exports.user_authenticate_post = asyncHandler(async(req, res, next) => {
	res.json('Authenticate User POST not implemented');
});

// passport.authenticate('local', {
// 	'successReturnToOrRedirect': '/auth/log-in',
// 	'failureRedirect': '/auth/log-in',
// 	'failureFlash': true,
// 	'keepSessionInfo': true, // using for now, appears to be an active PR https://github.com/jaredhanson/passport/pull/941
// });

exports.user_logout_post = asyncHandler(async (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
});
