const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const opts = {'toJSON': {'virtuals': true}};
const postSchema = new Schema({
	'user': {'type': Schema.Types.ObjectId, 'ref': 'User', 'required': true},
	'title': {'type': String, 'required': true},
	'content': {'type': String, 'required': true, 'minLength': 5},
	'postdate': {'type': Date, 'required': true, 'default': new Date()},
	'status': {'type': String, 'enum': ['draft', 'public', 'restricted'], 'default': 'draft', 'required': true},
}, opts);

module.exports = mongoose.model('Post', postSchema);
