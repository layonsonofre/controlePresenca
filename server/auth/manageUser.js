var pwdMgr = require('./managePasswords');

module.exports = function(server, db) {
  db.usuarios.ensureIndex({
    email: 1
  }, {
    unique: true
  })

  server.post('/controlePresenca/auth/login', function(req, res, next) {
    var user = req.params;
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify({
      'debug': true,
      'email': user.email
    }));
    return next();

    // if (user.email.trim().length == 0 || user.senha.trim().length == 0) {
    //   res.writeHead(403, {
    //     'Content-Type': 'application/json; charset=utf-8'
    //   });
    //   res.end(JSON.stringify({
    //     error: "Credenciais inválidas"
    //   }));
    // }
    console.log("in");
    db.usuarios.findOne({
      email: req.params.email
    }, function(err, dbUser) {
      pwdMgr.comparePassword(user.password, dbUser.password, function(err, isPasswordMatch) {
        if (isPasswordMatch) {
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          // remove password hash before sending to the client
          dbUser.password = "";
          res.end(JSON.stringify(dbUser));
        } else {
          res.writeHead(403, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify({
            error: "Usuário inválido"
          }));
        }
      });
    });
    return next();
  });

  server.post('/controlePresenca/auth/register', function(req, res, next) {
    var user = req.params;

    pwdMgr.cryptPassword(user.senha, function(err, hash) {
      user.senha = hash;
      console.log("n", hash);
      db.usuarios.insert(user,
        function(err, dbUser) {
          if (err) { // duplicate key error
            if (err.code == 11000) /* http://www.mongodb.org/about/contributors/error-codes/*/ {
              res.writeHead(400, {
                'Content-Type': 'application/json; charset=utf-8'
              });
              res.end(JSON.stringify({
                error: err,
                message: "Um usuário com este email já existe"
              }));
            }
          } else {
            res.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8'
            });
            dbUser.password = "";
            res.end(JSON.stringify(dbUser));
          }
        });
    });
    return next();
  });
};
