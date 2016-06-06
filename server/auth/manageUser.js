var pwdMgr = require('./managePasswords');
var express = require('express');
var server = express();
var config = require('../config/database');
var mongoose = require('mongoose');
var passport = require('passport');
var Usuario = require('../models/usuario');
var jwt = require('jwt-simple');

mongoose.connect(config.database);
require('../config/passport')(passport);

var router = express.Router();

router.post('/controlePresenca/auth/register', function(req, res) {
  if (!req.body.email || !req.body.senha) {
    res.writeHead(403, {
      'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify({
      error: "Por favor, informe um nome, email e senha"
    }));
  } else {
    var newUser = new Usuario({
      nome: req.body.nome,
      senha: req.body.senha,
      email: req.body.email
    });
    newUser.save(function(err) {
      if (err) {
        if (err.code == 11000) { // http://www.mongodb.org/about/contributors/error-codes/
          res.json({
            error: err,
            message: "Um usuário com este email já existe"
          });
        }
      }
      res.json({ success: true, message: 'Usuário cadastrado com maestria'});
    });
  }
});

router.post('/controlePresenca/auth/login', function(req, res) {
  Usuario.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.send({success: false, message: 'Falha na autenticação: usuário não encontrado'});
    } else {
      user.comparePassword(req.body.senha, function (err, isMatch) {
        if(isMatch && !err) {
          var token = jwt.encode(user, config.secret);
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, message: 'Falha na autenticação: senha errada'});
        }
      });
    }
  }
  );
});

module.exports = router;
