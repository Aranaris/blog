var express = require('express');
var router = express.Router();
var post_controller = require('../controllers/postController');

/* GET posts listing. */
router.get('/', post_controller.post_list);

// GET Create post Form
router.get('/create', post_controller.post_create_get);

// POST Create post
router.post('/create', post_controller.post_create_post);

// UPDATE post by id
// DELETE post by id
router.post('/:id/delete', post_controller.post_delete_post);

// GET all comments for post
router.get('/:id/comments', post_controller.post_comments_get);

// GET post by id

module.exports = router;
