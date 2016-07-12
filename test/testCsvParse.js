const assert = require('assert');
const quoteFileUtil = require('../util/quoteFileUtil');

describe('Parse Quote CSV', function() {


    describe('parse', function () {
        it('should parse csv', function (done) {
            quoteFileUtil.parse( './test/test.csv', function(){
                quoteFileUtil.getData( function( err, data){
                    let state = true;
                    console.log(`data -> ${JSON.stringify( data)}`);
                    let result = Array.from( data).find( function( it){
                        console.log(`[1] ${JSON.stringify(it)}`)
                        return it.quote === 'quote_1' && it.author === 'author_1';
                    });
                    state &= result != undefined;
                    console.log(`[1] state -> ${state}`);
                    result = result && Array.from( data).find( function( it){
                            console.log(`[2] ${JSON.stringify(it)}`)
                            return  it.quote === 'quote_2' && it.author === 'author_2';
                        });
                    state &= result != undefined;
                    console.log(`[2] state -> ${state}`);
                    result = result && Array.from( data).find( function( it){
                            console.log(`[3] ${JSON.stringify(it)}`)
                            return  it.quote === 'quote_3' && it.author === 'author_3';
                        });
                    state &= result != undefined;
                    console.log(`[3] state -> ${state}`);
                    assert.equal( state, true);
                    done();
                });
            });
        });
    });
})
