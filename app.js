var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var app = express();
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(bodyParser());
  

var path = require('path');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

var port = 8080;

require('./routes.js')(app);

app.listen(port,function(err){
	if(err)
		console.log('error in connecting');
	else{
		mongoose.connect('mongodb://127.0.0.1:27017/videoport')
		console.log("app is running on port number")
	}
})
