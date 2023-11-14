const Post = require('../models/post');
const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');

//display posts
exports.post_list = asyncHandler(async(req, res, next) => {
	const allPosts = await Post.find().populate('user').sort({'postdate': -1}).exec();
	res.send(allPosts);
});

//get post by id
exports.post_get = asyncHandler(async(req, res, next) => {
	const post = await Post.findById(req.params.id).populate('user').exec();
	res.json(post);
});

//get most recent post
exports.post_get_latest = asyncHandler(async(req, res, next) => {
	const post = await Post.find().where({'status': 'public'}).sort('-postdate').limit(1).populate('user').exec();
	res.json(post[0]);
});

exports.post_create_post = asyncHandler(async(req, res, next) => {
	const post = new Post({
		'user': req.user.id,
		'title': req.body.title,
		'content': req.body.content,
		'status': 'draft',
	});
	await post.save();
	res.json(post);
});

//update or remove post
exports.post_delete_post = asyncHandler(async(req, res, next) => {
	const post = await Post.findById(req.params.id).populate('user').exec();
	if (req.user.role === 'admin' || req.user.id === post.user.id) {
		post.deleteOne();
		res.json(post);
	}	else {
		res.status(403).json({'errors':{'msg':'Invalid Authz'}});
	}
});

//getting comments for post
exports.post_comments_get = asyncHandler(async(req, res, next) => {
	const postComments = await Comment
		.find({'post': req.params.id})
		.populate('user')
		.sort({'commentdate': 1})
		.exec();
	res.send(postComments);
});
