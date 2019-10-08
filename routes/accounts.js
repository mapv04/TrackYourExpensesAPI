const express = require('express'),
	router = express.Router(),
	verifyToken = require('../verifyToken'),
	AccountController = require('../controllers/AccountsControllers');

router.post('/newAccount', verifyToken, AccountController.createNewAccount);

router.get('/allAccounts', verifyToken, AccountController.findAllAccounts);

router.delete('/deleteAccount/:_id', verifyToken, AccountController.deleteAccount);

router.put('/updateAccount/:id', verifyToken, AccountController.updateAccount);

module.exports = router;
