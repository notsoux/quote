
var quoteModel = require('../model/quoteModel');

var express = require('express');
var router = express.Router();

/* GET a random quote. */
router.get('/', function(req, res, next) {
  quoteModel.randomQuote( function( err, data){
    if( err){
      throw err; }
    else {
      res.render('quote', {quote: data});
    }
  })

});

module.exports = router;
