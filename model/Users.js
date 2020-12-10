const mongoose = require('mongoose');
const mongoosastic = require("mongoosastic");
cons

const schema = new mongoose.Schema({
  Name: { type: String},
  Email: { type: String },
  Password: { type: String },
  PhoneNumber: { type: Number },
  Address: { type: String },
  City: { type: String },
  State: { type: String },
  Country: { type: String },
  CompanyName: { type: String },
  JobTitle: { type: String },
  JobDescription: { type: String },
  JobType: { type: String },
});

schema.plugin(mongoosastic);
module.exports = mongoose.model('Users', schema);

let Users = mongoose.model('Users', schema , 'users');

Users.createMapping(function(err, mapping) {
  if(err){
    console.log('error creating mapping (you can safely ignore this)');
    console.log(err);
  }else{
    console.log('mapping created!');
    console.log(mapping);
  }
})