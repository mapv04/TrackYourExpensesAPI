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
	const mongoAccountId = new mongodb.ObjectID(req.params._id);
	/**
	 * Delete the incomes from that account
	 */
	Income.deleteMany({ account_id: mongoAccountId }, function(err, incomesDeleted) {
		if (err) {
			console.log(err);
			res.status(400).send({ message: err });
		} else {
			/** 
			 * Delete the expenses from that account*
			 */
			Expense.deleteMany({ account_id: mongoAccountId }, function(err, expensesDeleted) {
				if (err) {
					console.log(err);
					res.status(400).send({ message: err });
				} else {
					/**
					 * Delete the account
					 */
					Account.deleteOne({ _id: mongoAccountId, user_id: req.user._id }, function(err, accountDeleted) {
						if (err) {
							console.log(err);
							res.status(400).send({ message: err });
						} else {
							res.status(200).send({
								_id: req.params._id,
								user_id: req.user._id,
								message: 'Account deleted'
							});
						}
					});
				}
			});
		}
	});
});

module.exports = router;
