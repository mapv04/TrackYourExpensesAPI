const express = require('express'),
	router = express.Router(),
	verifyToken = require('../verifyToken'),
	Expense = require('../models/expense'),
	Account = require('../models/account');

router.post('/createNewExpense', verifyToken, function(req, res) {
	var newExpense = {
		name: req.body.name,
		description: req.body.description,
		date: req.body.date,
		total: req.body.total,
		movs: req.body.movs,
		account_id: req.body.accountId
	};

	Expense.create(newExpense, function(error, newly) {
		if (error) {
			console.log(error);
			res.status(400).send({ message: error });
		} else {
			res.status(201).send(newly);
		}
	});
});

router.get('/allExpenses/:accountId', verifyToken, function(req, res) {
	Expense.find({ account_id: req.params.accountId }, function(err, allExpense) {
		if (err) {
			console.log(err);
			res.status(401).send({ message: err });
		} else {
			res.status(200).send(allExpense);
		}
	});
});

router.get('/expense/:id', verifyToken, function(req, res) {
	Expense.findById(req.params.id, function(err, expense) {
		if (err) {
			console.log(err);
			res.status(401).send({ message: err });
		} else {
			res.status(200).send(expense);
		}
	});
});

router.put('/expense/updateExpense/:id', verifyToken, function(req, res) {
	Expense.findById(req.params.id, function(err, expense) {
		if (err) {
			console.log(err);
			res.status(400).send({ message: err });
		}

		expense = req.body;
		expense.save();
		res.status(200).send(expense);
	});
});

module.exports = router;
