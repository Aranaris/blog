const Post = require('../models/post');
const asyncHandler = require('express-async-handler');

//display posts
exports.post_list = asyncHandler(async(req, res, next) => {
    const allPosts = await Post.find().sort({username: 1}).exec();
    res.send(allPosts);
});

//create post functions
exports.post_create_get = asyncHandler(async(req, res, next) => {
    res.send('Create Post GET not implemented');
});

exports.post_create_post = asyncHandler(async(req, res, next) => {
    res.send('Create Post POST not implemented');
});

//update or remove post
exports.post_delete_post = asyncHandler(async(req, res, next) => {
    res.send('Delete Post POST not implemented');
})

