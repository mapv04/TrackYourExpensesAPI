const express = require('express'),
	router = express.Router(),
	verifyToken = require('../verifyToken'),
	Income = require('../models/income');

router.post('/createNewIncome', verifyToken, function(req, res) {
	var newIncome = {
		name: req.body.name,
		description: req.body.description,
		date: req.body.date,
		movs: req.body.movs,
		account_id: req.body.accountId
	};

	Income.create(newIncome, function(err, newly) {
		if (err) {
			console.log(err);
			res.status(400).send({ message: err });
		} else {
			res.status(201).send(newly);
		}
	});
});

router.get('/allIncomes/:accountId', verifyToken, function(req, res) {
	Income.find({ account_id: req.params.accountId }, function(err, allIncomes) {
		if (err) {
			console.log(err);
			res.status(401).send({ message: err });
		} else {
			res.status(200).send(allIncomes);
		}
	});
});

module.exports = router;
