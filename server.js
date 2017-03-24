   /////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////REQUIRE SQL//////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'cooper',
  password : 'coop9092',
  database : 'memories',
  socketPath : '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock'
});

connection.connect();

connection.query('SELECT 1+1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();


   /////////////////////////////////////////////////////////////////////////////////
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

});





   /////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////LOG IN/////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
app.post('/login', function(req, res){
	console.log(req.body.username, " ", req.body.password, "");
	if (!req.body.username || !req.body.password) {
		res.send("Username or password is incorrect");
		return;
	}
	if(req.body.student == "true"){
		// Data will be user data, if its not then the wrong crudentials. if correct user, confirm login and send to correct page
		connection.query('SELECT username, password FROM users WHERE username = ? AND password = ?', [req.body.username, req.body.password], function(err, data, fields){	
			console.log(data, "yay");
			if(err){
				console.log(err);
				return;
			}
			if(data !== null){
				req.session.user = data;
					console.log(req.session);
				res.send(JSON.stringify({message: "success", data:data, type:"student"}));
				return;
			}else{
				res.send({
					message: "TRY AGAIN!"
				});
				return;
			}
			
		});
	}
});


   /////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////IS LOGGED IN?/////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

// req.session.isLoggedIn=true; 
// app.get("/", function(req, res){
// 	if(req.session.isLoggedIn) {
// 		res.redirect("/loggedin");
// 	} else {
// 		res.redirect("/login");
// 	}
// });

   /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////GET DATA////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
app.get('/api/mmemories', function(req, res){
	connection.query('SELECT id FROM mmemories WHERE userid = ?');
			var arr = [];
			for(var obj of data){
				for(var i in obj.mmemories){
					arr.push(obj.mmemories[i]);
				}
			}
			console.log(arr);
});



		// 	if (data){
		// 		// res.send(JSON.stringify(arr));
		// 		connection.query('mmemories').find({
		// 			_id: {
		// 				$in: arr
		// 			}
		// 		}).toArray(function(err, data){
		// 			res.send(JSON.stringify(data));
		// 			return;
		// 		});
		// 	}
		// });

   /////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////STUFF/////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
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
	console.log("listin on porta 8080");
});
///serve publicly over upload folder 

//     //////////////////////////////////////////////////////////////////////////////////
//    //////////////////////////////////////////////////////////////////////////////////
//   ////////////////////////////////////GRAPHICS MAGICK ~**///////////////////////////
//  //////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////
// var gm = require('gm');

// gm('/path/to/image.jpg')
// .resize(353, 257)
// .autoOrient()
// .write(writeStream, function (err) {
//////////////   if (!err) console.log(' hooray! '