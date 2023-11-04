console.log('populate mongodb with some test data');

const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

const posts = [];
const users = [];
// const comments = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dotenv = require('dotenv');
dotenv.config({'path' : './.env'});
const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));

async function main() {
	console.log('Debug: About to connect');
	await mongoose.connect(mongoDB);
	console.log('Debug: Should be connected?');
	await createUsers();
	await createPosts();
	await createComments();
	console.log('Debug: Closing mongoose');
	mongoose.connection.close();
}

async function userCreate(index, username, firstname, dateofbirth) {
	const userdetail = {
		'username': username,
		'firstname': firstname,
	};

	if (dateofbirth != false) {
		userdetail.dateofbirth = dateofbirth;
	}

	const user = new User(userdetail);
	await user.save();
	users[index] = user;

	console.log(`Added user ${username}`);
}

async function createUsers() {
	console.log('adding users');
	await Promise.all([
		userCreate(0, 'testuser', 'testname', '1995-12-03'),
	]);
}

async function postCreate(index, title, content, user, postdate) {
	const messagedetail = {
		'title': title,
		'content': content,
		'user': user,
	};

	if (postdate != false) {
		messagedetail.postdate = postdate;
	}

	const post = new Post(messagedetail);
	await post.save();
	posts[index] = post;

	console.log(`Added post ${content}`);
}

async function createPosts() {
	console.log('adding posts');
	await Promise.all([
		postCreate(0, 'test title', 'first!', users[0], '2016-01-23'),
	]);
}

async function commentCreate(index, content, user, post, commentdate) {
	const commentdetail = {
		'content': content,
		'user': user,
		'post': post,
	};

	if (commentdate != false) {
		commentdetail.commentdate = commentdate;
	}

	const comment = new Comment(commentdetail);
	await comment.save();
	posts[index] = comment;

	console.log(`Added comment ${content}`);
}

async function createComments() {
	console.log('adding comments');
	await Promise.all([
		commentCreate(0, 'first!', users[0], posts[0], '2020-01-23'),
	]);
}

