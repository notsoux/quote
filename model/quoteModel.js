const quoteFileUtil = require( '../util/quoteFileUtil');
const dao = require( '../dao/dao');

var quoteModel = {
    randomQuote: function( callback){
        quoteFileUtil.getData( function( err, data){
            if( err){
                callback( err, null);
            }
            let quoteIndex = Math.round( Math.random() * data.length);
            let quote = data[ quoteIndex];
            callback( null, quote);
        })
    },
    randomQuoteFromDb: function( callback){
        dao.randomDocument( callback);
    }
}

module.exports = quoteModel;
