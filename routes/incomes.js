const express = require('express'),
	router = express.Router(),
	verifyToken = require('../verifyToken'),
	Income = require('../models/income'),
	Account = require('../models/account');

router.post('/createNewIncome', verifyToken, function(req, res) {
	Account.findById(req.body.accountId, function(err, account) {
		if (err) {
			console.log(err);
			res.status(400).send({ message: error });
		} else {
			if (account.user_id == req.user._id) {
				var newIncome = {
					name: req.body.name,
					description: req.body.description,
					date: req.body.date,
					total: req.body.total,
					movs: req.body.movs,
					account_id: req.body.accountId
				};
				Income.create(newIncome, function(error, newly) {
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

router.get('/allIncomes/:accountId', verifyToken, function(req, res) {
	Account.findById(req.params.accountId, function(err, account) {
		if (err) {
			console.log(err);
			res.status(401).send({ message: err });
		} else {
			if (account.user_id == req.user._id) {
				Income.find({ account_id: req.params.accountId }, function(error, allIncomes) {
					if (error) {
						console.log(error);
						res.status(401).send({ message: error });
					} else {
						res.status(200).send(allIncomes);
					}
				});
			} else {
				res.status(400).send({ message: 'Access denied' });
			}
		}
	});
});

router.get('/income/:id', verifyToken, function(req, res) {
	Income.findById(req.params.id, function(err, income) {
		if (err) {
			console.log(err);
			res.status(401).send({ message: err });
		} else {
			Account.findById(income.account_id, function(error, account) {
				if (error) {
					console.log(error);
					res.status(400).send({ message: error });
				} else {
					if (account.user_id == req.user._id) {
						res.status(200).send(income);
					} else {
						res.status(400).send({ message: 'Access denied' });
					}
				}
			});
		}
	});
});

module.exports = router;
