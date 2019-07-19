const express = require('express');
const router = express.Router();
const Account = require('../models/account');
const verifyToken = require('../verifyToken');
const mongodb = require('mongodb');

router.post('/newAccount', verifyToken, function(req, res) {
	console.log('Peticion de crear nueva cuenta');
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
			console.log(allAccounts);
			res.status(200).send(allAccounts);
		}
	});
});

router.delete('/deleteAccount', verifyToken, (req, res) => {
	Account.deleteOne({ _id: new mongodb.ObjectID(req.body._id), user_id: req.user._id }, function(
		err,
		accountDeleted
	) {
		if (err) {
			console.log(err);
			res.status(400).send({ message: err });
		} else {
			console.log(accountDeleted);
			res.status(200).send({
				_id: req.body._id,
				user_id: req.user._id,
				message: 'Account deleted'
			});
		}
	});
});

module.exports = router;
