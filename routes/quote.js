var quoteModel = require('../model/quoteModel');

var express = require('express');
var router = express.Router();

/* GET a randowm quote. */
router.get('/', function(req, res, next) {
  quoteModel.randomQuote( function( err, data){
    if( err){
      throw err;
    }
    res.send( data);
  })

});

module.exports = router;
