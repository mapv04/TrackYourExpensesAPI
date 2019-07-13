var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	lastname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		index: true,
		unique: true
	},
	passwordHash: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('User', UserSchema);
