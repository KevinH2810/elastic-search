const CitizenController = require('./CitizenController')
const AuthController = require('./AuthController')

module.exports = {
    citizenController: new CitizenController(),
    authController: new AuthController(),
}