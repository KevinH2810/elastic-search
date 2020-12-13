const BaseController = require("./BaseController");
const HandleError = require("./HandleError");
const { CitizenService } = require("../services");

module.exports = class CitizenController extends BaseController {
	constructor() {
		super(new CitizenService());
	}

	async AddCitizen(req, res) {
		const {
			name,
			email,
			phonenumber,
			address,
			city,
			state,
			country,
			company,
			jobTitle,
			jobDescription,
			jobType,
		} = req.body;
		const handleError = new HandleError();

		this.service.addCitizen(
			{
				name,
				email,
				phonenumber,
				address,
				city,
				state,
				country,
				company,
				jobTitle,
				jobDescription,
				jobType,
			},
			(err, result) => {
				if (err) {
					handleError.sendCatchError(res, err);
					return;
        }
        
        return this.sendSuccessResponse(res, {
					status: 200,
					message: result,
				})

				res.json({
					status: 200,
					message: "topup success",
				});
				return;
			}
		);
		//     if (err) {
		//         handleError.sendCatchError(res, err);
		//         return;
		//     }

		//     res.json({
		//         "status": 200,
		//         "message": "topup success",
		//     })
		//     return;
	}

	async getCitizen(req, res){
		const {
			search
		} = req.query;
		const handleError = new HandleError();

		this.service.searchCitizen(search, (err, result) => {
			if (err) {
				handleError.sendCatchError(res, err);
				return;
			}
			
			return this.sendSuccessResponse(res, {
				status: 200,
				message: result,
			})
		})
	}
};
