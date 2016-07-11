
var sendHTML = function( res, name){
    res.sendFile( `public/html/${name}`, { root: __dirname +'/../' });
};

module.exports = sendHTML;