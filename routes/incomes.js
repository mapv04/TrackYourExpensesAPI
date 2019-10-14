const express = require('express'),
	router = express.Router(),
	verifyToken = require('../verifyToken'),
	Income = require('../models/income'),
	IncomesController = require('../controllers/IncomesController');

router.post('/createNewIncome', verifyToken, IncomesController.createNewIncome);

router.get('/allIncomes/:accountId', verifyToken, IncomesController.findAllIncomes);

router.get('/income/:id', verifyToken, IncomesController.findIncome);

router.put('/income/updateIncome/:id', verifyToken, IncomesController.updateIncome);

module.exports = router;
