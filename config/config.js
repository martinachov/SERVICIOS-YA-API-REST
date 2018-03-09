//Config file
module.exports = {
	name: 'API-REST',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
    base_url: process.env.BASE_URL || 'http://localhost:3000',
	jwtSecret: 'Supersecreto'
};