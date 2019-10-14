const AccountModel = require('../models/account'),
	IncomeModel = require('../models/income'),
	ExpenseModel = require('../models/expense');

module.exports.createNewAccount = async (req, res) => {
	var name = req.body.name;
	var color = req.body.color;
	var lastUpdate = req.body.lastUpdate;
	var user = req.user._id;
	var newAccount = new AccountModel({
		name: name,
		color: color,
		lastUpdate: lastUpdate,
		user_id: user
	});

	try {
		const accountCreated = await newAccount.save();
		res.status(201).send(accountCreated);
	} catch (error) {
		console.log(err);
		res.status(400).send({ message: err });
	}
};

module.exports.findAllAccounts = async (req, res) => {
	try {
		const allAccounts = await AccountModel.find({ user_id: req.user._id });
		res.status(200).send(allAccounts);
	} catch (error) {
		res.status(200).send(allAccounts);
	}
};

module.exports.deleteAccount = async (req, res) => {
	try {
		const account = await AccountModel.findById(req.params._id);
		const promises = await Promise.all([
			account.remove(),
			IncomeModel.deleteMany({ account_id: req.params._id }),
			ExpenseModel.deleteMany({ account_id: req.params._id })
		]);
		res.status(200).send({
			_id: account._id,
			message: 'Account deleted'
		});
	} catch (error) {
		console.log(err);
		res.status(400).send({ message: err });
	}
};

module.exports.updateAccount = async (req, res) => {
	try {
		var account = await AccountModel.findById(req.params.id);
		account = req.body;
		const accountUpdated = await account.save();
		res.status(200).send('Account updated');
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
};
