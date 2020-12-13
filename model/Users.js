const mongoose = require('mongoose');
const { Upserts } = require('../util');

const schema = new mongoose.Schema({
    username: { type: String},
    hashedpassword: { type : String},
    role: { type: String },
});

schema.plugin(Upserts);

module.exports = mongoose.model('Users', schema);