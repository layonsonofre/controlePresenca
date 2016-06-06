var isEmailValid = function(db, email, callback) {
  db.usuarios.findOne({
    email: email
  }, function(err, user) {
    callback(user);
  });
};

module.exports.validate = function(req, res, db, callback) {
  if (!req.params.token) {
    res.writeHead(403, {
      'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify({
      error: "Você não está autorizado à acessar esta aplicação",
      message: "É necessário um email como parte do cabeçalho"
    }));
  };

  isEmailValid(db, req.params.token, function(user) {
    if (!user) {
      res.writeHead(403, {
        'Content-Type': 'application/json; charset=utf-8'
      });
      res.end(JSON.stringify({
        error: "Você não está autorizado à acessar esta aplicação",
        message: "Email de usuário inválido"
      }));
    } else {
      callback();
    }
  });
};
