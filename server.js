//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////REQUIRE SQL///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'example.org',
  user     : 'bob',
  password : 'secret'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});




//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////PHOTO UPLOAD/////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// // // // // // // // // // // // // 
//// // // //  Express// // // // // 
// // // // // // // // // // // // 
var express = require("express");
var app = express();

// // // // // // // // // // // 
//// //  Body Parser// // // // 
// // // // // // // // // // /
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// // // // // // // // // // // 
// Session
// // // // // // // // // // // 

var session = require("express-session");
app.use(session({
	secret: 'keyboard cat', // secret key
	resave: false, // default value
	saveUninitialized: true, // saves empty objects
}));

// // // // // // // // // // // 
// // // // // Multer// // // // 
// // // // // // // // // // // 
var multer = require("multer");
var upload = multer({
	dest: __dirname + '/uploads',
	limits: {
		fileSize: 10000000 // 10mb
	}
});




// // // // // // // // // // // 
// Middleware
// // // // // // // // // // // 

app.post('/savefile', upload.single('myfile'), function(req, res) {
	console.log(req.file);
	console.log(req.body);
	res.send(req.file.filename);
});

app.get('/uploads/:hash', function(req, res) {
	res.setHeader('Content-Type', 'image/jpeg');

	res.sendFile(__dirname + '/uploads/' + req.params.hash);
});

app.get('/uploads/:hash', function(req, res){

})

  // // // // // // // // // // ///
 // // // Serve Static Files // // 
// // // // // // // // // // /// 
app.use(express.static('public'));

// // // // // // // // // // // 
// 404 Middleware
// // // // // // // // // // // 
app.use(function(req, res, next) {
	res.status(404);
	res.send("404 File Not Found ... :( ");
});

// // // // // // // // // // // 
// 500 Middleware
// // // // // // // // // // // 
app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500);
	res.send("500 Internal server error... D:");
});

// // // // // // // // // // // 
// Actually Start the Server //
// // // // // // // // // // // 
app.listen(8080, function() {
	console.log("You have a server :)");
});
///serve publicly over upload folder 