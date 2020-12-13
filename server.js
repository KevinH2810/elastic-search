var express = require("express")
var app = express()
const cors = require('cors');
const config = require('./config/config')
const bodyParser = require('body-parser'); 

require('./db/mongoDB')()
require('./db/initDB')()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./routes')(app);

app.listen(config.app.port, () => console.log(`Express server currently running on port ${config.app.port}`));