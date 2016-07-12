
var should = require('chai');
var assert = require('assert');
var request = require('supertest');
require('should-http');

const constant = require('../constant/Constant');

process.env.MONGODB_CONNECTION_STRING = 'mongodb://localhost:27017/test_quotes';

const dao = require('../dao/dao');

describe('Add Quote', function() {

    // within before() you can run all the operations that are needed to setup your test. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    beforeEach(function (done) {
        dao.connect( function () {
            dao.deleteAll( done);
        });
    });


    describe('Add one quote', function() {
        let QUOTE_VAL = 'Test quote 1';
        let AUTHOR_VAL = 'Test author 1';
        it('should return inserted quote', function (done) {
            request( 'http://localhost:3001')
                .post('/quote/insert')
                .send( {
                    quote: QUOTE_VAL,
                    author: AUTHOR_VAL
                })
                // end handles the response
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    //console.log(`res -> ${JSON.stringify( res)}`);
                    res.should.have.status(200);
                    //assert.notEqual( -1, res.text.indexOf( constant.QUOTE_NOT_AVAILABLE_MESSAGE));
                    done();
                });
        });
    });


    describe('Add one quote and get it back', function() {
        let QUOTE_VAL = 'Test quote 1';
        let AUTHOR_VAL = 'Test author 1';
        it('should return inserted quote', function (done) {
            request( 'http://localhost:3001')
                .post('/quote/insert')
                .send( {
                    quote: QUOTE_VAL,
                    author: AUTHOR_VAL
                })
                // end handles the response
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    request( 'http://localhost:3001')
                        .get('/quote/from_db')
                        // end handles the response
                        .end(function(err, res) {
                            if (err) {
                                throw err;
                            }
                            res.should.have.status(200);

                            //check if quote contains quote / author inserted
                            assert.notEqual( res.text.indexOf( QUOTE_VAL), -1);
                            assert.notEqual( res.text.indexOf( AUTHOR_VAL), -1);
                            done();
                        });
                });
        });
    });



});