const ExpenseModel = require('../models/expense');

module.exports.createNewExpense = async (req, res) => {
	var newExpense = new ExpenseModel({
		name: req.body.name,
		description: req.body.description,
		date: req.body.date,
		total: req.body.total,
		movs: req.body.movs,
		account_id: req.body.accountId
	});

	try {
		const expense = await newExpense.save();
		res.status(201).send(expense);
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: error });
	}
};

module.exports.findAllExpenses = async (req, res) => {
	try {
		const allExpenses = await ExpenseModel.find({ account_id: req.params.accountId });
		res.status(200).send(allExpenses);
	} catch (error) {
		console.log(error);
		res.status(401).send({ message: error });
	}
};

module.exports.findExpense = async (req, res) => {
	try {
		const expense = await ExpenseModel.findById(req.params.id);
		res.status(200).send(expense);
	} catch (error) {
		console.log(error);
		res.status(401).send({ message: error });
	}
};

module.exports.updateExpense = async (req, res) => {
	try {
		var expense = await ExpenseModel.findById(req.params.id);
		expense = req.body;
		const expenseUpdated = await expense.save();
		res.status(200).send(expenseUpdated);
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: error });
	}
};
