const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const opts = {'toJSON': {'virtuals': true}};
const userSchema = new Schema({
	'username': {'type': String, 'required': true, 'unique': true, 'dropDups': true, 'minLength': 3},
	'password': {
		'type': String,
		'required': true,
		'trim': true,
		'minLength': 7,
		validate(value) {
			if(value.toLowerCase().includes('password')){
				throw new mongoose.Error('Password cannot be password');
			}
		},
		'default': '',
	},
	'firstname': {'type': String, 'required': true},
	'lastname': {'type': String},
	'dateofbirth': {'type': Date},
	'lastaction': {'type': Date, 'default': new Date()},
	'role': {'type': String, 'required': true, 'default': 'new user'},
}, opts);

userSchema.pre('save', async function (next) {
	const user = this;
	if(user.isModified('password')){
		user.password = await bcrypt.hash(user.password, 10);
	}
	next();
});

module.exports = mongoose.model('User', userSchema);
