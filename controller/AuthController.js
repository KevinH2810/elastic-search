const BaseController = require("./BaseController");
const HandleError = require("./HandleError");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { LoginService } = require("../services");

module.exports = class AuthController extends BaseController {
	constructor() {
		super(new LoginService());
	}

	// register to MongoDB
	async register(req, res) {
		const { username, password } = req.query;
		const handleError = new HandleError();
		const hashedPassword = await this.hashPassword(password);
		console.log(`hashedPassword = ${hashedPassword}`)

		this.service.ValidateUserInDatabe(username, (err, result) => {
			console.log(`username = ${username}`)
			if (err){
				handleError.sendCatchError(res, err);
					return;
			}

			

			if(result){
				return this.sendResourceAlreadyExistResponse(res , {
					status: 409,
					message: "User Already Registered"
				})
			}

			if (!result){
				this.service.registerNewUser(
					{ username, hashedPassword },
					(err, result) => {
						if (err) {
							handleError.sendCatchError(res, err);
							return;
						}
		
						return this.sendSuccessResponse(res, {
							status: 200,
							message: "User Registered",
						});
					}
				);
			}
		})	
	}

	async login(req, res) {
		const { username, password } = req.query;

		// get from mongodb
		this.service.ValidateUserInDatabe({username}, (err, result) => {
			if (err) {
				handleError.sendCatchError(res, err);
				return;
			}

			if (result.length === 0) {
				return this.sendNotFoundResponse(res, {
					status: 404,
					message: "username does not exist",
				});
			}

			if (this.isPasswordCorrect(password, result.password)) {
				return this.sendInvalidPayloadResponse(res, {
					status: 422,
					message: "password does not match",
				});
			}

			// create a token
			var tokens = jwt.sign(
				{ username: result.username, password: result.password },
				config.token.secret,
				{
					expiresIn: 86400, // expires in 24 hours
				}
			);

			return this.sendSuccessResponse(res, {
				status: 200,
				message: {
					message: "login succesfull",
					token: tokens,
				},
			});
		});
	}
};
