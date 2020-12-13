const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const { Upserts } = require('../util');
const config = require('../config/config')

const schema = new mongoose.Schema({
  Name: { type: String},
  Email: { type: String },
  PhoneNumber: { type: String },
  Address: { type: String },
  City: { type: String },
  State: { type: String },
  Country: { type: String },
  CompanyName: { type: String },
  JobTitle: { type: String },
  JobDescription: { type: String },
  JobType: { type: String },
});

schema.plugin(mongoosastic, {
  "host": config.elasticSearch.host,
  "port": config.elasticSearch.port,
});
schema.plugin(Upserts);

module.exports = mongoose.model('Citizen', schema);