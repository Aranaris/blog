var express = require('express');
var router = express.Router();
var post_controller = require('../controllers/postController');

/* GET posts listing. */
router.get('/', post_controller.post_list);

// GET Create post Form
router.get('/create', post_controller.post_create_get);

// POST Create post
router.post('/create', post_controller.post_create_post);

// GET post by id
// UPDATE post by id
// DELETE post by id
router.post('/:id/delete', post_controller.post_delete_post);

module.exports = router;
