var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var AccountSchema = new mongoose.Schema({
	name: String,
	color: String,
	imageLocation: String,
	lastUpdate: String,
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

AccountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', AccountSchema);
