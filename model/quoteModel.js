var quoteFileUtil = require( '../util/quoteFileUtil');
var constant = require( '../constant/Constant');

let quoteList;
var quoteModel = {
    randomQuote:function( callback){
        quoteFileUtil.getData( function( err, data){
            if( err){
                callback( Error( constant.QUOTE_DATA_STILL_NOT_AVAILABLE), null);
            }
            let quoteIndex = Math.round( Math.random() * data.length);
            let quote = data[ quoteIndex];
            callback( null, quote);
        })
    }
}

module.exports = quoteModel;
