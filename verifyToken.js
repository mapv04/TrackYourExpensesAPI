const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
	const token = req.header('auth-token');
	console.log('Token: ' + token);
	if (!token) return res.status(401).send({ message: 'Acces denied' });

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).send({ message: 'Acces denied' });
	}
};
