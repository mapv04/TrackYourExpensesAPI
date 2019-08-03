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

/*router.delete('/deleteAccount/:_id', verifyToken, (req, res) => {
	const mongoAccountId = new mongodb.ObjectID(req.params._id);

	Account.deleteOne({ _id: mongoAccountId, user_id: req.user._id }, function(err, accountDeleted) {
		if (err) {
			console.log(err);
			res.status(400).send({ message: err });
		} else {
			Income.deleteMany({ account_id: mongoAccountId }, function(error, incomesDeleted) {
				if (error) {
					console.log(error);
					res.status(400).send({ message: error });
				} else {
					Expense.deleteMany({ account_id: mongoAccountId }, function(error2, expensesDeleted) {
						if (error2) {
							console.log(error2);
							res.status(400).send({ message: error2 });
						} else {
						}
					});
				}
			});
			res.status(200).send({
				_id: req.params._id,
				user_id: req.user._id,
				message: 'Account deleted'
			});
		}
	});
});*/

router.delete('/deleteAccount/:_id', verifyToken, (req, res) => {
	const mongoAccountId = new mongodb.ObjectID(req.params._id);
	Account.findById(req.params._id, function(err, account) {
		if (err) {
			console.log(err);
			res.status(400).send({ message: err });
		} else {
			if (account.user_id == req.user_id) {
				account.remove();
			} else {
				res.status(400).send({ message: 'Access denied' });
			}
		}
	});
});

module.exports = router;
