const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const { Upserts } = require('../util');
const config = require('../config/config')

const schema = new mongoose.Schema({
    username: { type: String},
    password: { type : String},
    role: { type: String },
});

schema.plugin(mongoosastic, {
  "host": config.elasticSearch.host,
  "port": config.elasticSearch.port,
});
schema.plugin(Upserts);

module.exports = mongoose.model('Users', schema);