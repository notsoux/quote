
var quoteModel = require('../model/quoteModel');
var dao = require( '../dao/dao');

const sendfileUtil = require('../util/sendfileUtil');
const response_util = require( '../util/response_util');

var express = require('express');
var router = express.Router();

/* GET a random quote. */
router.get('/', function(req, res, next) {
  quoteModel.randomQuote( function( err, data){
    if( err){
      throw err;
    } else {
      res.render('quote', {quote: data});
    }
  })

});

router.get('/from_db', function(req, res, next) {
  quoteModel.randomQuoteFromDb( function( data){
      if( data !== undefined) {
          res.render('quote', {quote: data});
      } else {
          response_util.noQuote( res);
      }
  })

});

router.get( '/insert', function ( req, res, next) {
  sendfileUtil( res, 'insert_quote.html');
});

router.post('/insert', function( req, res, next){
  dao.insertDocument( { 'quote': req.body.quote, 'author': req.body.author},
      function ( result) {
        res.render('inserted_ok');
      });
});

module.exports = router;
