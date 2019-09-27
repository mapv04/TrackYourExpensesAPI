var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
	lastname: String,
	email: String,
	username: String ,
	passwordHash:String
});

module.exports = mongoose.model('User', UserSchema);
