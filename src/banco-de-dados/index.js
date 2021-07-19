const { Sequelize } = require("sequelize")
require('dotenv').config()

const instancia = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: `localhost`,
        dialect: 'mysql',
    }
)

module.exports = instancia