var restify = require('restify'),
	  mongo = require('mongoskin'),
    ObjectID = mongo.ObjectID;

//'test:test_password@dharma.mongohq.com:10062/nfradin_fr

var db = mongo.db('test:test_password@dharma.mongohq.com:10062/', {
  database: 'nfradin_fr',
  safe: true
});


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

  	var user = new Object();
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
