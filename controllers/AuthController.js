const bcrypt = require('bcrypt'),
	jwt = require('jsonwebtoken'),
	UserModel = require('../models/user');

module.exports.signUp = async (req, res) => {
	const userExists = await UserModel.findOne({ username: req.body.username });
	if (userExists) return res.status(409).send({ message: 'Username already exists' });

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
		res.status(201).send({ savedUser });
	} catch (err) {
		res.status(400).send(err);
	}
};

module.exports.logIn = async (req, res) => {
	const user = await UserModel.findOne({ username: req.body.username });
	if (!user) return res.status(404).send(); // username does not exists
	const validPass = await bcrypt.compare(req.body.password, user.passwordHash);
	if (!validPass) return res.status(401).send(); //username or password wrong

	//Create token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
	res
		.status(200)
		.header('auth-token', token)
		.send({ token: token, name: user.name, lastname: user.lastname, username: user.username });
};
