var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	dotenv = require('dotenv');

//import routes
const auth = require('./auth');
const accounts = require('./accounts');

//Enviroment variables
dotenv.config();

/**
 * App configuration
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Database connection
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });
const port = 80;

/*************************************************** */
// ROUTES
/*************************************************** */
app.get('/', function(req, res) {
	res.send('Inicio');
});

app.use('/api/user/auth', auth);
app.use('/api/user/accounts', accounts);

app.listen(port, () => console.log('Service listening to port: ' + port));
