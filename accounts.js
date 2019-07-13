const express = require('express');
const router = express.Router();
const Account = require('./models/account');
const verifyToken = require('./verifyToken');

router.post('/newAccount', verifyToken, function(req, res) {
	var name = req.body.name;
	var color = req.body.color;
	var imageEncoded = req.body.imageEncoded;
	var lastUpdate = req.body.lastUpdate;
	var user = req.user._id;
	var newAccount = {
		name: name,
		color: color,
		imageEncoded: imageEncoded,
		lastUpdate: lastUpdate,
		user_id: user
	};

	Account.create(newAccount, function(err, newly) {
		if (err) console.log(err);
		else {
			console.log(newly);
			res.send(newly);
		}
	});
});

router.get('/allAccounts', verifyToken, (req, res) => {
	console.log('All accounts: ' + req.user._id);
	Account.find({ user_id: req.user._id }, function(err, allAccounts) {
		if (err) console.log(err);
		else {
			console.log(allAccounts);
			res.send(allAccounts);
		}
	});
});

module.exports = router;
