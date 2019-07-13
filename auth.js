const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
	//check if the user already exists
	const userExists = await UserModel.findOne({ username: req.body.username });
	if (userExists) return res.status(400).send('Username already exists');

	//Hash password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	//Create a new user
	const user = new UserModel({
		name: req.body.name,
		lastname: req.body.lastname,
		email: req.body.email,
		username: req.body.username,
		passwordHash: hashPassword
	});

	try {
		const savedUser = await user.save();
		res.send({ savedUser });
	} catch (err) {
		res.status(400).send(err);
	}
});

router.post('/login', async (req, res) => {
	const user = await UserModel.findOne({ username: req.body.username });
	if (!user) return res.status(400).send('Username does not exists');
	const validPass = await bcrypt.compare(req.body.password, user.passwordHash);
	if (!validPass) return res.status(400).send('Wrong password');

	//Create token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1m' });
	res.header('auth-token', token).send(token);
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/login');
});

module.exports = router;
