const constant = require( '../constant/Constant');

var response_util = {

    noQuote: function( res){
        res.render('quote_not_available.jade', {message: constant.QUOTE_NOT_AVAILABLE_MESSAGE});
    }
}

module.exports = response_util;
