var mongoose = require('mongoose');

var expenseSchema = new mongoose.Schema({
	name: String,
	description: String,
	date: String,
	total: Number,
	account_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account'
	},
	movs: [
		{
			mov: String,
			whereOrWho: String,
			quantity: Number
		}
	]
});
module.exports = mongoose.model('Expense', expenseSchema);
