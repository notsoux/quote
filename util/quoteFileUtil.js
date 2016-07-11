const fs = require('fs');
const csv = require('csv-parse');
const constant = require('../constant/Constant');

let dataAvailable = false;
let data = [];

var stream = fs.createReadStream("./data/quotes.csv");

var csvStream = csv( )
    .on("data", function(csvData){
        let mappedData = {
            id: csvData[0],
            quote: csvData[1],
            author: csvData[2]
        };
        data.push( mappedData);
    })
    .on("end", function(){
        console.log("done");
        dataAvailable = true;
    });

stream.pipe(csvStream);


var quoteFileUtils = {
    getData: function( callback){
        if( dataAvailable){
            return callback( null, data);
        }
        let err = Error( constant.QUOTE_DATA_STILL_NOT_AVAILABLE);
        callback( err, null);
    }
}

module.exports = quoteFileUtils;
