var mongoose = require('mongoose');

var incomeSchema = new mongoose.Schema({
	name: String,
	description: String,
	date: String,
	account_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account'
	},
	movs: [
		{
			mov: String,
			quantity: Number
		}
	]
});
module.exports = mongoose.model('Income', incomeSchema);
