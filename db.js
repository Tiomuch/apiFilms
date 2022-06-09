const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: 'postgres',
    password: process.env.PASSWORD || 'password',
    host: 'localhost',
    port: 5432,
    database: 'api_films'
})

module.exports = pool