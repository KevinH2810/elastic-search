require('dotenv').config()

module.exports = {
    app: {
        port: process.env.API_PORT,
    },
    token: {
        secret: process.env.SECRET,
    },
    mongodb: {
        port: process.env.DB_PORT || 27017,
        host: process.env.DB_ES_HOST,
        database: process.env.DB_ES_NAME,
        username: process.env.DB_ES_USER,
        password: process.env.DB_ES_PASSWORD || '',
    }
}