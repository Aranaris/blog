const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const opts = {'toJSON': {'virtuals': true}};
const commentSchema = new Schema({
	'user': {'type': Schema.Types.ObjectId, 'ref': 'User', 'required': true},
	'post': {'type': Schema.Types.ObjectId, 'ref': 'Post', 'required': true},
	'content': {'type': String, 'required': true, 'minLength': 5},
	'commentdate': {'type': Date, 'required': true, 'default': new Date()},
}, opts);

module.exports = mongoose.model('Comment', commentSchema);
