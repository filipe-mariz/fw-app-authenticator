require('dotenv').config()

const env = {
	JSONWEBTOKEN_CODE: process.env.JSONWEBTOKEN_CODE,
	DB_DIELECT: process.env.DB_DIELECT,
	DB_HOST: process.env.DB_HOST,
	DB_PORT: process.env.DB_PORT,
	DB_USERNAME: process.env.DB_USERNAME,
	DB_DATABASE: process.env.DB_DATABASE,
	DB_PASSWORD: process.env.DB_PASSWORD,
}

export default {
	jsonwebtokenCode: env.JSONWEBTOKEN_CODE,
	dbDielect: env.DB_DIELECT,
	dbHost: env.DB_HOST,
	dbPort: env.DB_PORT,
	dbUsername: env.DB_USERNAME,
	dbPassword: env.DB_PASSWORD
}