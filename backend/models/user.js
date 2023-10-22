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
    role: {type: String, required: true, default: 'new user'},
})

module.exports = mongoose.Model('User', userSchema);
