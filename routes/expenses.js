const express = require('express'),
	router = express.Router(),
	verifyToken = require('../verifyToken'),
	ExpensesController = require('../controllers/ExpensesController');

router.post('/createNewExpense', verifyToken, ExpensesController.createNewExpense);

router.get('/allExpenses/:accountId', verifyToken, ExpensesController.findAllExpenses);

router.get('/expense/:id', verifyToken, ExpensesController.findExpense);

router.put('/expense/updateExpense/:id', verifyToken, ExpensesController.updateExpense);

module.exports = router;
