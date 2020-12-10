const { Citizen } = require('../model');
const BaseService = require('./baseServices');

module.exports = class CitizenService extends BaseService {
  constructor() {
    super(Citizen)
  }

  async addCitizen(payload, callback){
    console.log(JSON.stringify(payload, null, 4));
    this.model.createMapping({
      "settings": {
          "number_of_shards": 1,
          "number_of_replicas": 0,
          "analysis": {
              "filter": {
                  "nGram_filter": {
                      "type": "nGram",
                      "min_gram": 2,
                      "max_gram": 20,
                      "token_chars": [
                          "letter",
                          "digit",
                          "punctuation",
                          "symbol"
                      ]
                  }
              },
              "analyzer": {
                  "nGram_analyzer": {
                      "type": "custom",
                      "tokenizer": "whitespace",
                      "filter": [
                          "lowercase",
                          "asciifolding",
                          "nGram_filter"
                      ]
                  },
                  "whitespace_analyzer": {
                      "type": "custom",
                      "tokenizer": "whitespace",
                      "filter": [
                          "lowercase",
                          "asciifolding"
                      ]
                  }
              }
          }
      },
      "mappings": {
          "movie": {
              "_all": {
                  "analyzer": "nGram_analyzer",
                  "search_analyzer": "whitespace_analyzer"
              },
              "properties": {
                  "Name": {
                      "type": "string",
                  },
                  "Email": {
                      "type": "string"
                  },
                  "PhoneNumber": {
                      "type": "number"
                  },
                  "Address": {
                      "type": "string"
                  },
                  "City": {
                      "type": "string"
                  },
                  "State": {
                      "type": "string"
                  },
                  "Country": {
                      "type": "String"
                  },
                  "CompanyName": {
                      "type": "string"
                  },
                  "JobTitle": {
                      "type": "string"
                  },
                  "JobDescription": {
                      "type": "double"
                  },
                  "JobType": {
                      "type": "double"
                  },
              }
          }
      }
  }, function(err, mapping) {
      if (err) {
          console.log('error creating mapping (you can safely ignore this)');
      } else {
          console.log('mapping created!');
          console.log(mapping);
      }
  });
    
    const newUsers = await this.mapping(payload)

    console.log(`newUsers = ${newUsers}`)

    newUsers.save((err) => {
      if (err){
        callback(err, null)
        return
      }

    console.log('user added in both the databases');
      
    })

    newUsers.on('es-indexed', (err, result) => {
      console.log('indexed to elastic search');
    });

    return
  }


  async mapping(data, callback){
    return new Promise(resolve => {
      resolve(this.model({
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
      }))
    })
  }

}
