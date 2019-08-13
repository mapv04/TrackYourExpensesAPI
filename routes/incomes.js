const express = require('express'),
	router = express.Router(),
	verifyToken = require('../verifyToken'),
	Income = require('../models/income'),
	Account = require('../models/account');

router.post('/createNewIncome', verifyToken, function(req, res) {
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
});

router.get('/allIncomes/:accountId', verifyToken, function(req, res) {
	Income.find({ account_id: req.params.accountId }, function(error, allIncomes) {
		if (error) {
			console.log(error);
			res.status(401).send({ message: error });
		} else {
			res.status(200).send(allIncomes);
		}
	});
});

router.get('/income/:id', verifyToken, function(req, res) {
	Income.findById(req.params.id, function(err, income) {
		if (err) {
			console.log(err);
			res.status(401).send({ message: err });
		} else {
			res.status(200).send(income);
		}
	});
});

router.put('/income/updateIncome/:id', verifyToken, function(req, res) {
	Income.findById(req.params.id, function(err, income) {
		if (err) {
			console.log(err);
			res.status(400).send({ message: err });
		}

		income = req.body;
		income.save();
		res.status(200).send(income);
	});
});

module.exports = router;
