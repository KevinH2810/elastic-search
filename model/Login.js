const mongoose = require('mongoose')
const mongoosastic = require("mongoosastic");
const schema = new mongoose.Schema({
  username: { type: String},
  password: { type : String},
})

schema.plugin(mongoosastic);
Movie = module.exports = mongoose.model('Movie', schema);


Movie.createMapping({
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
                "movieName": {
                    "type": "string",
                },
                "movieYear": {
                    "type": "double"
                },
                "imageUrl": {
                    "type": "string"
                },
                "genre": {
                    "type": "string"
                },
                "director": {
                    "type": "string"
                },
                "producer": {
                    "type": "string"
                },
                "cast": {
                    "type": "String"
                },
                "writer": {
                    "type": "string"
                },
                "synopsis": {
                    "type": "string"
                },
                "rating": {
                    "type": "double"
                },
                "price": {
                    "type": "double"
                },
                "rentPrice": {
                    "type": "double"
                },
                "quantity": {
                    "type": "double"
                },
                "format": {
                    "type": "string"
                },
                "offer": {
                    "type": "double"
                },
                "offerString": {
                    "type": "string"
                },
                "language": {
                    "type": "string"
                }
            }
        }
    }
}, function(err, mapping) {
    if (err) {
        console.log('error creating mapping (you can safely ignore this)');
        console.log(err);
    } else {
        console.log('mapping created!');
        console.log(mapping);
    }
});