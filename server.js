///////////////////////////////////////////////////////////////////////////////
//
//	Written by Nicolas FRADIN
//  Date: 2013/03/11
//
///////////////////////////////////////////////////////////////////////////////
var	mongo = require('mongoskin'),
	restify = require('restify'),
	ObjectID = mongo.ObjectID;

require('users');

// Database connection
var db = mongo.db('localhost:27017/', {
  	database: 'nfradin_fr',
  	safe: true
});


//
// Create REST server
//
var server = restify.createServer();
server.use(restify.bodyParser());

server.post('/user', createUser);
server.get('/user/:id', getUser);
server.get('/users', getUsers);
server.get('/delete/:id', deleteUser);

server.listen(10010, function () {
  console.log('%s listening at %s', server.name, server.url);
});