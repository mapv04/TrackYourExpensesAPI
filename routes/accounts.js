const express = require('express'),
	router = express.Router(),
	Account = require('../models/account'),
	Income = require('../models/income'),
	Expense = require('../models/expense'),
	verifyToken = require('../verifyToken'),
	mongodb = require('mongodb');

router.post('/newAccount', verifyToken, function(req, res) {
	var name = req.body.name;
	var color = req.body.color;
	var imageLocation = req.body.imageLocation;
	var lastUpdate = req.body.lastUpdate;
	var user = req.user._id;
	var newAccount = {
		name: name,
		color: color,
		imageLocation: imageLocation,
		lastUpdate: lastUpdate,
		user_id: user
	};

	Account.create(newAccount, function(err, newly) {
		if (err) {
			console.log(err);
			res.status(400).send({ message: err });
		} else {
			res.status(201).send(newly);
		}
	});
});

router.get('/allAccounts', verifyToken, (req, res) => {
	Account.find({ user_id: req.user._id }, function(err, allAccounts) {
		if (err) {
			console.log(err);
			res.status(400).send({ message: err });
		} else {
			res.status(200).send(allAccounts);
		}
	});
});

router.delete('/deleteAccount/:_id', verifyToken, (req, res) => {
	Account.findById(req.params._id, function(err, account) {
		if (err) {
			console.log(err);
			res.status(400).send({ message: err });
		} else {
			if (account.user_id == req.user._id) {
				account.remove();
				Income.deleteMany({ account_id: req.params._id }, function(error, incomeDeleted) {
					if (error) {
						console.log(error);
						res.status(400).send({ message: error });
					} else {
						Expense.deleteMany({ account_id: req.params._id }, function(error2, expensesDeleted) {
							if (error2) {
								console.log(error2);
								res.status(400).send({ message: error });
							} else {
								res.status(200).send({
									_id: account._id,
									message: 'Account deleted'
								});
							}
						});
					}
				});
			} else {
				res.status(400).send({ message: 'Access denied' });
			}
		}
	});
});

module.exports = router;
