// modules =================================================
var express        = require('express');
var app            = express();


var port = process.env.PORT || 8080; // set our port

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app