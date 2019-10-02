var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

const { config } = require('./config/config');

//import routes
const auth = require('./routes/auth');
const accounts = require('./routes/accounts');
const incomes = require('./routes/incomes');
const expenses = require('./routes/expenses');

/**
 * App configuration
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Database connection
mongoose.connect(``, { useNewUrlParser: true });

/*************************************************** */
// ROUTES
/*************************************************** */
app.get('/', function(req, res) {
	res.send('Inicio');
});

app.use('/api/user/auth', auth);
app.use('/api/user/accounts', accounts);
app.use('/api/user/accounts/incomes', incomes);
app.use('/api/user/accounts/expenses', expenses);

app.listen(port, () => console.log('Service listening to port: ' + config.port));
