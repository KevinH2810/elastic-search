require('dotenv').config()

module.exports = {
    app: {
        port: process.env.API_PORT,
    },
    token: {
        secret: process.env.SECRET_KEY,
    },
    mongodb: {
        port: process.env.DB_PORT || 27017,
        host: process.env.DB_ES_HOST,
        database: process.env.DB_ES_NAME,
        username: process.env.DB_ES_USER,
        password: process.env.DB_ES_PASSWORD || '',
    },
    elasticSearch: {
        port: process.env.ES_PORT || 9200,
        host: process.env.ES_HOST || 'localhost',
    },
    salt: {
        salt: process.env.SALT_SYS || '',
        iteration: process.env.SALT_ITERATION || 0,
    }
}