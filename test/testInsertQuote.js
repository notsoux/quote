var should = require('should');
var assert = require('assert');
var request = require('supertest');

process.env.MONGODB_CONNECTION_STRING = 'mongodb://localhost:27017/test_quotes';

describe('Routing', function() {

    // within before() you can run all the operations that are needed to setup your tests. In this case
    // I want to create a connection with the database, and when I'm done, I call done().
    before(function (done) {
        done();
    });

    describe('Account', function() {
        it('should return no quote on empty store', function (done) {
            request( 'http://localhost:3000')
                .get('/quote')
                // end handles the response
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    // this is should.js syntax, very clear
                    res.should.have.status(400);
                    done();
                });
        })
    });

});