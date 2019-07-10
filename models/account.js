var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var AccountSchema = new mongoose.Schema({
	name: String,
	color: String,
	imageEncoded: String,
	lastUpdate: String,
	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	}
});

AccountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', AccountSchema);
