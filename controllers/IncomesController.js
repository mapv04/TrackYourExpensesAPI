const IncomeModel = require('../models/income');

module.exports.createNewIncome = async (req, res) => {
	var newIncome = new IncomeModel({
		name: req.body.name,
		description: req.body.description,
		date: req.body.date,
		total: req.body.total,
		movs: req.body.movs,
		account_id: req.body.accountId
	});

	try {
		const income = await newIncome.save();
		res.status(201).send(income);
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: error });
	}
};

module.exports.findAllIncomes = async (req, res) => {
	try {
		const allIncomes = await IncomeModel.find({ account_id: req.params.accountId });
		res.status(200).send(allIncomes);
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: error });
	}
};

module.exports.findIncome = async (req, res) => {
	try {
		const income = await IncomeModel.findById(req.params.id);
		res.status(200).send(income);
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: error });
	}
};

module.exports.updateIncome = async (req, res) => {
	try {
		var income = await IncomeModel.findById(req.params.id);
		income = req.body;
		const incomeUpdated = income.save();
		res.status(200).send(incomeUpdated);
	} catch (error) {
		console.log(error);
		res.status(400).send({ message: error });
	}
};
