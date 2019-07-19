var mongoose = require('mongoose');

var incomeSchema = new mongoose.Schema({
	name: String,
	description: String,
	date: String,
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	incomeItemId: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'IncomeItem'
		}
	]
});
module.exports = mongoose.model('Income', incomeSchema);
