const { User } = require("../model");
const BaseService = require("./baseServices");

module.exports = class LoginService extends BaseService {
	constructor() {
		super(User);
	}

	async ValidateUserInDatabe(payload, callback) {
		return new Promise((resolve) =>
			this.model.findOne({ username: payload.username }, (err, res) => {
				if (err) {
					console.log(`[Validate] - ${err}`);
					return callback(err, null);
				}
				return callback(null,res);
			})
		);
	}

	async registerNewUser(payload, callback) {
		this.model.create(
			{
				username: payload.username,
				hashedpassword: payload.hashedPassword,
				role: "admin",
			},
			(err, res) => {
				if (err) {
					console.log(`[Validate] - ${err}`);
					return callback(err, null);
				}
				return callback(null, res);
			}
		);
	}
};
