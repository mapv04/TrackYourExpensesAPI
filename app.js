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
	var newUser = new User({
		name: req.body.name,
		lastname: req.body.lastname,
		email: req.body.email,
		username: req.body.username
	});
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			console.log(err);
		} else {
			passport.authenticate('local')(req, res, function() {
				res.send('Sign Up correctly: ' + user);
			});
		}
	});
});
/*app.post('/addNewUser', function(req, res) {
	User.register(
		new User({
			name: req.body.name,
			lastname: req.body.lastname,
			email: req.body.email,
			username: req.body.username
		}),
		req.body.password,
		function(err, user) {
			if (err) {
				console.log(err);
			} else {
				passport.authenticate('local')(req, res, function() {
					res.send('Sign Up correctly: ' + user);
				});
			}
		}
	);
});*/

//Login
app.post('/login', passport.authenticate('local'), function(req, res) {
	// If this function gets called, authentication was successful.
	// req.user contains the authenticated user.
	res.redirect('accounts/allAccounts');
});

app.post('/accounts/newAccount', authenticationMiddleware(), function(req, res) {
	var name = req.body.name;
	var color = req.body.color;
	var imageEncoded = req.body.imageEncoded;
	var lastUpdate = req.body.lastUpdate;
	var user = req.user.id;
	console.log(user);
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

app.get('/accounts/allAccounts', authenticationMiddleware(), function(req, res) {
	Account.find({ user_id: req.user.id }, function(err, allAccounts) {
		console.log(req.user.id);
		if (err) console.log(err);
		else {
			console.log(allAccounts);
			res.send(allAccounts);
		}
	});
});

function authenticationMiddleware() {
	return (req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/login');
	};
}

app.listen(port, () => console.log('Service listening to port: ' + port));
