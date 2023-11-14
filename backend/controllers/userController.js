const User = require('../models/user');
const Post = require('../models/post');
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {serialize} = require('cookie');

//display users
exports.user_list = asyncHandler(async(req, res, next) => {
	const allUsers = await User.find().sort({'username': 1}).exec();
	res.json(allUsers);
});

//create user functions

exports.user_create_post = [
	body('username')
		.trim()
		.isLength({'min': 3})
		.withMessage('Username must be more than 2 characters.')
		.isAlphanumeric()
		.withMessage('Username Error: Invalid characters.'),
	body('firstname')
		.trim()
		.isLength({'min': 1})
		.withMessage('First name must be specified.')
		.isAlphanumeric()
		.withMessage('First Name Error: Invalid characters.'),
	asyncHandler(async(req, res, next) => {
		const errors = validationResult(req);

		const user = new User({
			'username': req.body['username'],
			'firstname': req.body['firstname'],
			'password': req.body['password'],
			'role':req.body['role'],
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
	if (req.user.role === 'admin') {
		const user = await User.findById(req.params.id).exec();
		await User.findByIdAndRemove(req.params.id);
		res.json(user);
	} else {
		res.status(403).json({'errors':{'msg':'Invalid Authz (Not Admin)'}});
	}
});

exports.user_get = asyncHandler(async(req, res, next) => {
	const user = await User.findById(req.params.id).exec();
	res.json(user);
});

//get all posts for user
exports.user_get_posts = asyncHandler(async(req, res, next) => {
	const posts = await Post.find({'user':req.params.id}).exec();
	res.json(posts);
});

//auth endpoints
//user login
exports.user_authenticate_post = asyncHandler(async(req, res, next) => {
	const {username, password} = req.body;
	const defaultError = {'message': 'Invalid Credentials'};
	if (!username || !password) {
		return res.status(400).json({
			'message': 'Username or Password not present',
		});
	} else {
		const user = await User.findOne({username}).exec();
		if (user) {
			await bcrypt.compare(password, user.password, function(err, result) {
				if(result) {
					const payload = {
						'id': user.id,
						username,
						'role':user.role,
					};
					const maxAge = 3 * 60 * 60;
					const token = jwt.sign(
						payload,
						process.env.JWT_SECRET,
						{
							'expiresIn': maxAge,
						},
					);
					const serialized = serialize('jwt', token, {
						'maxAge': maxAge,
						'path': '/',
						'httpOnly': true,
					});
					res.set({
						'Set-Cookie': serialized,
					});
					res.status(200).json(payload);
				} else {
					res.status(403).json(defaultError);
				}
			});
		} else {
			return res.status(403).json(defaultError);
		}
	}
});

//verify authorization actions
exports.user_verify_authorization = asyncHandler(async(req, res, next) => {
	jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, async function(err, decoded) {
		if(err) {
			res.status(401).json({'errors':{'msg':'Invalid Token'}});
		} else {
			req.user = await User.findOne({'_id': decoded.id}).exec();
			next();
		}
	});
});

exports.user_logout_post = asyncHandler(async (req, res, next) => {
	res.clearCookie('jwt');
	res.json(null);
});
