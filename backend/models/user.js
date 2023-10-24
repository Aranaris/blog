const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const opts = { toJSON: {virtuals: true}};
const userSchema = new Schema({
    username: {type: String, required: true, unique: true, dropDups: true, minLength: 5},
    password: {type: String},
    firstname: {type: String, required: true},
    lastname: {type: String},
    dateofbirth: {type: Date},
    lastaction: {type: Date, default: new Date()},
    role: {type: String, required: true, default: 'new user'},
}, opts);

module.exports = mongoose.model('User', userSchema);
