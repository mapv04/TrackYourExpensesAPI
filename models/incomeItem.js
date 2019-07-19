var mongoose = require('mongoose');

var incomeItemSchema = mongoose.Schema({
	name: String,
	quantity: Number
});

module.exports = mongoose.model('IncomeItem', incomeItemSchema);
