const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const constant = require ('../constant/Constant');

var url = process.env.MONGODB_CONNECTION_STRING;

let db;

var dao = {
    connect: function( callback){
        console.log(`mongodb connection url -> ${url}`);
        MongoClient.connect(url, function(err, _db) {
            assert.equal(null, err);
            console.log(`Connected correctly to server. -> ${db}`);
            //db.close();
            db = _db;
            callback( err);
        });
    },
    deleteAll: function( callback){
        db.collection('quote').deleteMany( {}, function(err, results) {
            console.log( 'deleteAll');
            callback();
        });
    },

    insertDocument : function( documentToInsert, callback) {
        db.collection('quote').insertOne(
            documentToInsert, function(err, result) {
            if( err){
                throw Error( constant.DB_CONNECTION_STILL_NOT_AVAILABLE);
            }
            assert.equal(err, null);
            console.log("Inserted a document into the restaurants collection.");
            callback( result);
        });
    },
    randomDocument: function( callback){
        db.collection('quote').aggregate(
            [ { $sample: { size: 1} } ],
            function( err, result){
                if( err){
                    throw Error( constant.DB_CONNECTION_STILL_NOT_AVAILABLE);
                }
                assert.equal(err, null);
                console.log(`randomDocument -> ${JSON.stringify(result[0])}`);
                callback( result[0]);
            }
        )
    }
}

module.exports = dao;
