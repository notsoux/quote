var assert = require('chai');
var should = require('chai');
var assert = require('assert');
var request = require('supertest');
require('should-http');

const constant = require('../constant/Constant');

process.env.MONGODB_CONNECTION_STRING = 'mongodb://localhost:27017/test_quotes';

const dao = require('../dao/dao');

describe('Quote', function() {

    // within before() you can run all the operations that are needed to setup your test. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    before(function (done) {
        dao.connect( function () {
            dao.deleteAll( done);
        });
    });

    describe('No quote present', function() {
        it('should return no quote on empty store - check default message when no quote found', function (done) {
            request( 'http://localhost:3001')
                .get('/quote/from_db')
                // end handles the response
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    console.log(`res.text -> ${res.text}`);
                    res.should.have.status(200);
                    assert.notEqual( -1, res.text.indexOf( constant.QUOTE_NOT_AVAILABLE_MESSAGE));
                    done();
                });
        })
    });


    describe('Add quote', function() {
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
                    console.log(`res -> ${JSON.stringify( res)}`);
                    res.should.have.status(200);
                    //assert.notEqual( -1, res.text.indexOf( constant.QUOTE_NOT_AVAILABLE_MESSAGE));
                    done();
                });
        })
    });

});