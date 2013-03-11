var  restify = require('restify')
	,mongoose = require('mongoose')
	,config = require('./mongo-config')
	,db = mongoose.connect(config.creds.mongoose_auth)
	,Schema = mongoose.Schema,
	,ObjectId = Schema.ObjectId;


//
// Define Application Schemas
//
var UserSchema = new Schema({
	username	: 	String,
	password	: 	String,
	email		: 	String,
	dateCreated	: 	{ type: Date, default: Date.now }
});

var BlogPostSchema = new Schema({
	title	: 	{ type: String },
	body 	: 	{ type: String },
	author	: 	User
});


//
// Register Application Schemas
//
mongoose.model('User', UserSchema);
mongoose.model('BlogPost', BlogPostSchema);

//
// Retrieve Models
//
var User = mongoose.model('User');
var BlogPost = mongoose.model('BlogPost');

//
// Create REST server
//
var server = restify.createServer();
server.use(restify.bodyParser());

//
// Define server functions
//
function createUser(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); 
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");

  	var user = new User();
  	user.username = req.params.username;
  	user.password = req.params.password;
  	user.email 	= req.params.email;
  	user.save(function(err) {
  		if(err) console.error("Unable to save user " + user.username + " !");
  		else console.log("User " + user.username + " saved !");
  		res.send(req.body);
  	})
}

function getUser(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); 
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");

  	User.findOne({_id: new ObjectId(req.params.id)}, function(err, data) {
  		if(err) {
  			console.error("Unable to find user with id: " + req.params.id + " !");
  		}

  		res.send(data);
  	});
}

function removeUser(req, res, next) {

}

function updateUser(req, res, next) {

}

server.post('/user', createUser);
server.get('/user/:id', getUser);

mongoose.connect('mongodb://localhost/mongodbtest');