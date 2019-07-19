var mongoose = require('mongoose');

var expenseSchema = new mongoose.Schema({
	name: String,
	description: String,
	date: String,
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	expenseItemId: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ExpenseItem'
		}
	]
});
module.exports = mongoose.model('Expense', expenseSchema);
