const express = require('express'),
	router = express.Router(),
	verifyToken = require('../verifyToken'),
	Expense = require('../models/expense'), 
	Account = require('../models/account');

router.post('/createNewExpense', verifyToken, function(req, res) {
	Account.findById(req.body.accountId, function(err, account) {
		if (err) {
			console.log(err);
			res.status(400).send({ message: error });
		} else {
			if (account.user_id == req.user._id) {
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
			} else {
				res.status(400).send({ message: 'Access denied' });
			}
		}
	});
});

router.get('/allExpenses/:accountId', verifyToken, function(req, res) {
	Account.findById(req.params.accountId, function(err, account) {
		if (err) {
			console.log(err);
			res.status(401).send({ message: err });
		} else {
			if (account.user_id == req.user._id) {
				Expense.find({ account_id: req.params.accountId }, function(error, allExpense) {
					if (error) {
						console.log(error);
						res.status(401).send({ message: error });
					} else {
						res.status(200).send(allExpense);
					}
				});
			} else {
				res.status(400).send({ message: 'Access denied' });
			}
		}
	});
});

router.get('/expense/:id', verifyToken, function(req, res) {
	Expense.findById(req.params.id, function(err, expense) {
		if (err) {
			console.log(err);
			res.status(401).send({ message: err });
		} else {
			Account.findById(expense.account_id, function(error, account) {
				if (error) {
					console.log(error);
					res.status(400).send({ message: error });
				} else {
					if (account.user_id == req.user._id) {
						res.status(200).send(expense);
					} else {
						res.status(400).send({ message: 'Access denied' });
					}
				}
			});
		}
	});
});

module.exports = router;
