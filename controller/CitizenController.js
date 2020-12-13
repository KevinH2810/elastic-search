const BaseController = require("./BaseController");
const HandleError = require("./HandleError");
const { CitizenService } = require("../services");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = class CitizenController extends BaseController {
	constructor() {
		super(new CitizenService());
	}

	async AddCitizen(req, res) {
		const {
			Name,
			Email,
			PhoneNumber,
			Address,
			City,
			State,
			Country,
			Company,
			JobTitle,
			JobDescription,
			JobType,
		} = req.body;
		const handleError = new HandleError();

		let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
		if (token.startsWith("Bearer ")) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}

		if (token) {
			jwt.verify(token, config.token.secret, (err, decoded) => {
				if (err) {
					return res.json({
						status: 500,
						success: false,
						message: `Token is not valid error = ${err}`,
					});
				}

				this.service.addCitizen(
					{
						Name,
						Email,
						PhoneNumber,
						Address,
						City,
						State,
						Country,
						Company,
						JobTitle,
						JobDescription,
						JobType,
					},
					(err, result) => {
						if (err) {
							handleError.sendCatchError(res, err);
							return;
						}

						return this.sendSuccessResponse(res, {
							status: 200,
							message: result,
						});
					}
				);
			});
		} else {
			handleError.sendCatchError(res, {
				message: "Auth token is not supplied",
			});
			return;
		}
	}

	async GetCitizen(req, res) {
		const { search } = req.query;
		const handleError = new HandleError();

		if (!search){
			return this.sendInvalidPayloadResponse(res, {
				status: 422,
				message: "please supply the parameter 'search'",
			});
		}

		this.service.searchCitizen(search, (err, result) => {
			if (err) {
				handleError.sendCatchError(res, err);
				return;
			}

			return this.sendSuccessResponse(res, {
				status: 200,
				message: result,
			});
		});
	}

	async DeleteCitizen(req, res) {
		const { id } = req.query;
		const handleError = new HandleError();

		if (!id){
			return this.sendInvalidPayloadResponse(res, {
				status: 422,
				message: "please supply the id params of the data",
			});
		}

		let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
		if (token.startsWith("Bearer ")) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}

		if (token) {
			jwt.verify(token, config.token.secret, (err, decoded) => {
				if (err) {

					return this.sendBadRequestResponse(res, {
						status: 400,
						message: `Token is not valid error = ${err}`,
					});
				}

				this.service.deleteCitizen(
					{
						id,
					},
					(err, result) => {
						if (err) {
							handleError.sendCatchError(res, err);
							return;
						}

						return this.sendSuccessResponse(res, {
							status: 200,
							message: result,
						});
					}
				);
			});
		} else {
			handleError.sendCatchError(res, {
				message: "Auth token is not supplied",
			});
			return;
		}
	}

	async UpdateCitizen(req, res) {
		const {
			id,
			Name,
			Email,
			PhoneNumber,
			Address,
			City,
			State,
			Country,
			Company,
			JobTitle,
			JobDescription,
			JobType,
		} = req.body;
		const handleError = new HandleError();

		if (!id){
			return this.sendInvalidPayloadResponse(res, {
				status: 422,
				message: "please supply the id params of the data to filter the data",
			});
		}

		let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
		if (token.startsWith("Bearer ")) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}

		if (token) {
			jwt.verify(token, config.token.secret, (err, decoded) => {
				if (err) {
					return this.sendBadRequestResponse(res, {
						status: 400,
						message: `Token is not valid error = ${err}`,
					});
				}

				this.service.updateCitizen(
					{
						id,
						Name,
						Email,
						PhoneNumber,
						Address,
						City,
						State,
						Country,
						Company,
						JobTitle,
						JobDescription,
						JobType,
					},
					(err, result) => {
						if (err) {
							handleError.sendCatchError(res, err);
							return;
						}

						return this.sendSuccessResponse(res, {
							status: 200,
							message: result,
						});
					}
				);
			});
		} else {
			handleError.sendCatchError(res, {
				message: "Auth token is not supplied",
			});
			return;
		}
	}
};
