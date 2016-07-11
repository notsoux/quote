const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const constant = require ('../constant/Constant');

var url = 'mongodb://localhost:27017/quotes';

let db;
MongoClient.connect(url, function(err, _db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    //db.close();
    db = _db;
});

var dao = {
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
