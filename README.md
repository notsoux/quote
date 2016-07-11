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
 - add own quotes
 - better gui

