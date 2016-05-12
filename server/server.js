var restify = require('restify');
var mongojs = require('mongojs');
var morgan = require('morgan');
var db = mongojs('controlepresenca', ['usuarios', 'controlePresenca']);
var server = restify.createServer();
var manageUsers = require('./auth/manageUser')(server, db);
var managePresencas = require('./manageControlePresenca')(server, db);

// server.pre(restify.pre.sanitizePath());

server.use(restify.gzipResponse());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser({ mapParams: false }));
server.use(morgan('controlePresenca'));

// CORS
server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

server.listen(process.env.PORT || 9804, function() {
  console.log("Servidor rodando @ ", process.env.PORT || 9804);
});
