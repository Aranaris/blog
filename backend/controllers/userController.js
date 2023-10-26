const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

//display users
exports.user_list = asyncHandler(async(req, res, next) => {
    const allUsers = await User.find().sort({username: 1}).exec();
    res.json(allUsers);
});

//create user functions
exports.user_create_get = [
    body('username')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Username must be specified.')
    .isAlphanumeric()
    .withMessage('Invalid characters.'),
    body('firstname')
    .trim()
    .isLength({ min: 1 })
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('Invalid characters.'),
    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);

        const user = new User({
            username: req.body['username'],
            firstname: req.body['firstname'],
        })
        if (!errors.isEmpty()){
            res.json(errors.array());
        } else {
            await user.save();
            res.json(user);
        }
})];

exports.user_create_post = asyncHandler(async(req, res, next) => {
    res.send('Create User POST not implemented');
});

//update or remove user
exports.user_delete_post = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id).exec();
    await User.findByIdAndRemove(req.params.id);
    res.json(user);
})

exports.user_get = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.params.id).exec();
    res.json(user);
})

