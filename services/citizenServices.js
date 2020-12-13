const { Citizen } = require("../model");
const BaseService = require("./baseServices");
const util = require("util");

module.exports = class CitizenService extends BaseService {
	constructor() {
		super(Citizen);
	}

	async addCitizen(payload, callback) {
		this.model.createMapping(
			{
				settings: {
					number_of_shards: 1,
					number_of_replicas: 0,
					analysis: {
						filter: {
							nGram_filter: {
								type: "nGram",
								min_gram: 2,
								max_gram: 20,
								token_chars: ["letter", "digit", "punctuation", "symbol"],
							},
						},
						analyzer: {
							nGram_analyzer: {
								type: "custom",
								tokenizer: "whitespace",
								filter: ["lowercase", "asciifolding", "nGram_filter"],
							},
							whitespace_analyzer: {
								type: "custom",
								tokenizer: "whitespace",
								filter: ["lowercase", "asciifolding"],
							},
						},
					},
				},
				mappings: {
					movie: {
						_all: {
							analyzer: "nGram_analyzer",
							search_analyzer: "whitespace_analyzer",
						},
						properties: {
							Name: {
								type: "string",
							},
							Email: {
								type: "string",
							},
							PhoneNumber: {
								type: "number",
							},
							Address: {
								type: "string",
							},
							City: {
								type: "string",
							},
							State: {
								type: "string",
							},
							Country: {
								type: "String",
							},
							CompanyName: {
								type: "string",
							},
							JobTitle: {
								type: "string",
							},
							JobDescription: {
								type: "double",
							},
							JobType: {
								type: "double",
							},
						},
					},
				},
			},
			function (err, mapping) {}
		);

		const newUsers = await this.mapping(payload);

		newUsers.save((err) => {
			if (err) {
				callback(err, null);
				return;
			}
		});

		newUsers.on("es-indexed", (err, result) => {});

		return callback(null, "Successfully add data");
	}

	async searchCitizen(payload, callback) {
		const field = [
			"Name",
			"Email",
			"PhoneNumber",
			"Address",
			"City",
			"State",
			"Country",
			"CompanyName",
			"JobTitle",
			"JobDescription",
			"JobType",
		];
		console.log(`payload.length = ${payload.length}`)
		this.model.search(
			{
				multi_match: {
					query: payload,
					fields: field,
					minimum_should_match: payload.length,
					fuzziness: 1,
				},
			},{
				highlight: {
					require_field_match: false,
					fields: {
							"*": {
											"pre_tags": [
													"<b>"
											],
											"post_tags": [
													"</b>"
											]

									}
							}
						}
			},
			function (err, results) {
				// results here
				if (err) {
					return callback(err, null);
				}
				return callback(null, results.hits.hits);
			}
		);
	}

	async deleteCitizen(payload, callback) {
		this.model.createMapping(
			{
				settings: {
					number_of_shards: 1,
					number_of_replicas: 0,
					analysis: {
						filter: {
							nGram_filter: {
								type: "nGram",
								min_gram: 2,
								max_gram: 20,
								token_chars: ["letter", "digit", "punctuation", "symbol"],
							},
						},
						analyzer: {
							nGram_analyzer: {
								type: "custom",
								tokenizer: "whitespace",
								filter: ["lowercase", "asciifolding", "nGram_filter"],
							},
							whitespace_analyzer: {
								type: "custom",
								tokenizer: "whitespace",
								filter: ["lowercase", "asciifolding"],
							},
						},
					},
				},
				mappings: {
					movie: {
						_all: {
							analyzer: "nGram_analyzer",
							search_analyzer: "whitespace_analyzer",
						},
						properties: {
							Name: {
								type: "string",
							},
							Email: {
								type: "string",
							},
							PhoneNumber: {
								type: "number",
							},
							Address: {
								type: "string",
							},
							City: {
								type: "string",
							},
							State: {
								type: "string",
							},
							Country: {
								type: "String",
							},
							CompanyName: {
								type: "string",
							},
							JobTitle: {
								type: "string",
							},
							JobDescription: {
								type: "double",
							},
							JobType: {
								type: "double",
							},
						},
					},
				},
			},
			function (err, mapping) {}
		);

		const deleteUsers = await this.mapping(payload);

		this.model.findById(payload.id, (error, document) => {
			document.remove(function (err) {
				if (err) {
					// res.json({success:false});
					return callback(err, null);
				} else {
					// res.json({success:true})
					deleteUsers.on("es-removed", function (err, res) {
						if (err) throw err;
						/* Docuemnt is unindexed */
					});

					return callback(null, "Successfully remove data");
				}
			});
		});
	}

	async updateCitizen(payload, callback) {
		this.model.createMapping(
			{
				settings: {
					number_of_shards: 1,
					number_of_replicas: 0,
					analysis: {
						filter: {
							nGram_filter: {
								type: "nGram",
								min_gram: 2,
								max_gram: 20,
								token_chars: ["letter", "digit", "punctuation", "symbol"],
							},
						},
						analyzer: {
							nGram_analyzer: {
								type: "custom",
								tokenizer: "whitespace",
								filter: ["lowercase", "asciifolding", "nGram_filter"],
							},
							whitespace_analyzer: {
								type: "custom",
								tokenizer: "whitespace",
								filter: ["lowercase", "asciifolding"],
							},
						},
					},
				},
				mappings: {
					movie: {
						_all: {
							analyzer: "nGram_analyzer",
							search_analyzer: "whitespace_analyzer",
						},
						properties: {
							Name: {
								type: "string",
							},
							Email: {
								type: "string",
							},
							PhoneNumber: {
								type: "number",
							},
							Address: {
								type: "string",
							},
							City: {
								type: "string",
							},
							State: {
								type: "string",
							},
							Country: {
								type: "String",
							},
							CompanyName: {
								type: "string",
							},
							JobTitle: {
								type: "string",
							},
							JobDescription: {
								type: "double",
							},
							JobType: {
								type: "double",
							},
						},
					},
				},
			},
			function (err, mapping) {}
		);
		console.log(util.inspect(payload, { showHidden: false, depth: null }));
		this.model.findOneAndUpdate(
			{ _id: payload.id },
			{$set: payload},
			{
				upsert: true,
				new: true,
			},
			(error, document) => {
				if (error) {
					// res.json({success:false});
					console.log("error - ", error);
					return callback(error, null);
				}

				if (payload.name) document.Name = payload.name;
				if (payload.email) document.Email = payload.email;
				if (payload.phonenumber) document.PhoneNumber = payload.phonenumber;
				if (payload.address) document.Address = payload.address;
				if (payload.city) document.City = payload.city;
				if (payload.state) document.State = payload.state;
				if (payload.country) document.Country = payload.country;
				if (payload.companyname) document.CompanyName = payload.companyname;
				if (payload.jobtitle) document.JobTitle = payload.jobtitle;
				if (payload.jobdescription) document.JobDescription = payload.jobdescription;
				if (payload.jobtype) document.JobType = payload.jobtype;
				document.on("es-indexed", (err, result) => {});
				return callback(null, "Successfully Update data");
			}
		);
	}

	async mapping(data) {
		return new Promise((resolve) => {
			resolve(
				this.model({
					Name: data.Name,
					Email: data.Email,
					PhoneNumber: data.PhoneNumber,
					Address: data.Address,
					City: data.City,
					State: data.State,
					Country: data.Country,
					CompanyName: data.CompanyName,
					JobTitle: data.JobTitle,
					JobDescription: data.JobDescription,
					JobType: data.JobType,
				})
			);
		});
	}

	async isEmptyCitizen(callback){
		this.model.countDocuments((err, count) => {
			if (err){
				return callback(err, null)
			}

			return callback(null, count)
		})
	}
};
