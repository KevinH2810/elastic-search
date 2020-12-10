const saslprep = require('saslprep')
const mongoose = require('mongoose')

const config = require('../config/config')

function connectMongoose() {
  
  const uris = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`
  const options = {
    user: config.mongodb.username,
    pass: saslprep(config.mongodb.password),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
  return mongoose.connect(uris, options, error => {
    if (error) {
      console.log(`MongoDB connection error - retrying in 5 sec\n${error}`)
      setTimeout(connectMongoose, 5000)
    } else {
      console.log('MongoDB connection success')
    }
  })
}

module.exports = () => {
  connectMongoose()
}
