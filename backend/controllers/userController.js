const User = require('../models/user');
const asyncHandler = require('express-async-handler');

//display users
exports.user_list = asyncHandler(async(req, res, next) => {
    const allUsers = await User.find().sort({username: 1}).exec();
    res.send(allUsers);
});

//create user functions
exports.user_create_get = asyncHandler(async(req, res, next) => {
    res.send('Create User GET not implemented');
});

exports.user_create_post = asyncHandler(async(req, res, next) => {
    res.send('Create User POST not implemented');
});


