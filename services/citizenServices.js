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
		const field= [
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
				]
		this.model.search(
			{
				multi_match: {
					query: payload,
					fields: field,
					minimum_should_match: 2,
					fuzziness: 1
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

	async mapping(data, callback) {
		return new Promise((resolve) => {
			resolve(
				this.model({
					Name: data.name,
					Email: data.email,
					PhoneNumber: data.phonenumber,
					Address: data.address,
					City: data.city,
					State: data.state,
					Country: data.country,
					CompanyName: data.companyname,
					JobTitle: data.jobtitle,
					JobDescription: data.jobdescription,
					JobType: data.jobtype,
				})
			);
		});
	}
};
