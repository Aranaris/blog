const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
		if (!errors.isEmpty()){
			res.json({
				'errors': errors.array(),
			});
		} else {
			await user.save().catch(error => console.log(error));
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
	const {username, password} = req.body;
	const defaultError = {'message': 'Invalid Credentials'};
	if (!username || !password) {
		return res.status(400).json({
			'message': 'Username or Password not present',
		});
	} else {
		const user = await User.findOne({username});
		if (user) {
			await bcrypt.compare(password, user.password, function(err, result) {
				if(result) {
					const maxAge = 3 * 60 * 60;
					const token = jwt.sign(
						{'id': user.id, username},
						process.env.JWT_SECRET,
						{
							'expiresIn': maxAge,
						},
					);
					res.status(200).json(token);
				} else {
					res.status(403).json(defaultError);
				}
			});
		} else {
			return res.status(403).json(defaultError);
		}
	}
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
