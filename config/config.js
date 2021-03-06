const dotenv = require('dotenv').config();

const config = {
	dev: process.env.NODE_ENV !== 'production',
	port: process.env.PORT || 80,
	CORS: process.env.CORS,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbName: process.env.DB_NAME,
	dbHost: process.env.DB_HOST,
	tokenSecret: process.env.TOKEN_SECRET
};

module.exports = { config };
