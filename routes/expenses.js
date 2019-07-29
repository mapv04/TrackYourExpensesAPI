const express = require('express'),
	router = express.Router(),
	verifyToken = require('../verifyToken'),
	Expense = require('../models/expense');

router.post('/createNewExpense', verifyToken, function(req, res) {
	var newExpense = {
		name: req.body.name,
		description: req.body.description,
		date: req.body.date,
		movs: req.body.movs,
		account_id: req.body.accountId
	};

	Expense.create(newExpense, function(err, newly) {
		if (err) {
			console.log(err);
			res.status(400).send({ message: err });
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

module.exports = router;
