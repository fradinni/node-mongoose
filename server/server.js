///////////////////////////////////////////////////////////////////////////////
//
//	Written by Nicolas FRADIN
//  Date: 2013/03/11
//
///////////////////////////////////////////////////////////////////////////////
var	mongo = require('mongoskin'),
	restify = require('restify'),
	ObjectID = mongo.ObjectID;

var users = require('./users');

// Database connection
var db = mongo.db('localhost:27017/', {
  	database: 'nfradin_fr',
  	safe: true
});

//
//
//
var createUser = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	var user = new Object();
  	user.username = req.params.username;
  	user.password = req.params.password;
  	user.email 	= req.params.email;


  	var userExists = false;

  	db.collection('users').findOne({username: user.username}, function(err, data) {
  		if(err) throw err;
  		if(!data) {
  			db.collection('users').insert({
		  		username: user.username,
		  		password: user.password,
		  		email: user.email
		  	}, function(err2, result) {
		  		if(err2) {
		  			res.send(err);
		  			throw err;
		  		}
		  		if(result) {
		  			res.send(result);
		  			console.log("User '" + user.username + "' added !");
		  		}
		  	});
  		} else {
  			console.log("User '" + user.username + "' already exists !");
  			res.send({error: "User already exists !"});
  		}
  	});

  	return next();
};


var deleteUser = function(req, res, next) {

	console.log("ok = " + req.params.id);

	db.collection('users').remove({_id: new ObjectID(req.params.id)}, function(err2, result) {
		if(err2) throw err;
		if(result) {
			res.send(result);
		}
	});

	return next();
}


var updateUser = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	var user = new Object();
	user.id = req.params.id;
  	user.username = req.params.username;
  	user.password = req.params.password;
  	user.email 	= req.params.email;

  	db.collection('users').update({ _id: new ObjectID(user.id) }, {
  		'$set': {
  			username: user.username, 
  			password: user.password, 
  			email: user.email
  		}
  	});

	return next();
}


var getUser = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	db.collection('users').findOne({_id: new ObjectID(req.params.id)}, function(err, result) {
		if(err) {
			res.send(err);
  			throw err;
		}
		if(result) {
			console.log("User found: " + result.username);
			res.send(result);
		}
	});

	return next();
};


var getUsers = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	db.collection('users').find().toArray(function(err, result) {
		if(err) {
			throw err;
		}
		res.send(result);
	})

	return next();
}


//
// Create REST server
//
var server = restify.createServer();
server.use(restify.bodyParser());

server.post('/user', createUser);
server.get('/user/:id', getUser);
server.del('/user/:id', deleteUser);
server.put('/user', updateUser);
server.get('/users', getUsers);
w
server.listen(10010, function () {
  console.log('%s listening at %s', server.name, server.url);
});