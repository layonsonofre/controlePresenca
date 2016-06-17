var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/database');
var passport = require('passport');
var server = express();
var manageUsers = require('./manageUser');
var managePresencas = require('./manageControlePresenca');
var port = process.env.PORT || 9804;

server.use(passport.initialize());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

server.use(manageUsers);
server.use(managePresencas);

server.listen(port, function() {
  console.log("Servidor rodando @", port);
});

module.exports = server;
