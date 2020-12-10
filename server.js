var express = require("express")
var app = express()
const cors = require('cors');
const config = require('./config/config')

require('./db/mongoDB')()

app.use(cors())

require('./routes')(app);

app.listen(config.app.port, () => console.log(`Express server currently running on port ${config.app.port}`));