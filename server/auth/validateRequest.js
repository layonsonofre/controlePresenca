var isEmailValid = function(db, email, callback) {
  db.appUsers.findOne({
    email: email
  }, function(err, user) {
    callback(user);
  });
};
/** Trocar por um token depois, por enquanto está o email **/
module.exports.validate = function(req, res, db, callback) {
  // if the request dosent have a header with email, reject the request
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
