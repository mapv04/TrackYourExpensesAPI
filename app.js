var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	User = require('./models/user'),
	Account = require('./models/account');

mongoose.connect('mongodb://localhost/trackexpenses', { useNewUrlParser: true });
app.use(bodyParser.json());
const port = 80;

//Passport configuration
app.use(
	require('express-session')({
		secret: 'dbisdbv',
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

app.get('/', function(req, res) {
	res.send('Inicio');
});

/*************************************************** */
// ROUTES
/*************************************************** */

//Sign Up
app.post('/addNewUser', function(req, res) {
	console.log();
	User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
		if (err) {
			console.log(err);
		} else {
			passport.authenticate('local')(req, res, function() {
				res.send('Sign Up correctly: ' + user);
			});
		}
	});
});

//Login
app.post('/login', passport.authenticate('local'), function(req, res) {
	// If this function gets called, authentication was successful.
	// req.user contains the authenticated user.
	res.redirect('accounts/' + req.user.username);
});

app.post('/newAAccount', function(req, res) {});

app.get('/accounts/:id', authenticationMiddleware(), function(req, res) {});

function authenticationMiddleware() {
	return (req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/login');
	};
}

app.listen(port, () => console.log('Service listening to port: ' + port));
