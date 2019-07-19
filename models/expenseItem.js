var mongoose = require('mongoose');

var expenseItemSchema = mongoose.Schema({
	name: String,
	place: String,
	quantity: Number
});

module.exports = mongoose.model('ExpenseItem', expenseItemSchema);
