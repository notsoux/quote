#Quote

##Description
Simple node app to get a different quote every time is asked to.

##Install
```
npm install
node bin/www
```
##Usage
```
http://localhost:3000/quote
```
##Note
The app is based upon:
 - es6 
 - node 6.x
 - express 4.x
 
It reads quotes from a csv ```./data/quotes.csv``` ( format: ```id, quote, author```)
and stores them in an array.

#TODO's
 - use db to store quotes
 - add own quotes`
 - better gui


#Test
```
npm install mocha -g
npm install chai --save-dev
npm install supertest --save-dev
npm install should --save-dev
npm install should-http --save-dev
```

#Environment
##Test
```
MONGODB_CONNECTION_STRING=mongodb://localhost:27017/test_quotes;PORT=3001
```
##Dev
```
MONGODB_CONNECTION_STRING=mongodb://localhost:27017/quotes;PORT=3000
```