module.exports = function(server, db) {
  var validateRequest = require("../auth/validateRequest");

  /*
  //Exemplo da collection
  db.controlePresenca {
    _id: 1,
    nome: 'Semana da Física',
    ano: 2016,
    img: '/path/to/image.format',
    usuario: 'layonsonofre@gmail.com',
    senha: 'senhacriptografadacombcrypt',
    periodos: [
      { periodo_id: 1, data: '15/15/2015', hora_inicio: '19h10', hora_fim: '20h00', descricao: 'Palestra do Reitor' },
      { periodo_id: 2, data: '15/15/2015', hora_inicio: '20h10', hora_fim: '21h00', descricao: 'Palestra da EJEC' }
    ],
    presencas: [
      { periodo_id: 1, part_id: 1, part_nome: 'Layon de Souza Onofre', part_tipo: 'ouvinte' },
      { periodo_id: 1, part_id: 2, part_nome: 'Onofre de Layon Souza', part_tipo: 'ouvinte' },
      { periodo_id: 1, part_id: 3, part_nome: 'Souza de Onofre Layon', part_tipo: 'organizador' },
      { periodo_id: 1, part_id: 4, part_nome: 'de Onofre Souza Layon', part_tipo: 'ouvinte' },

      { periodo_id: 2, part_id: 3, part_nome: 'Souza de Onofre Layon', part_tipo: 'organizador' },
      { periodo_id: 2, part_id: 2, part_nome: 'Onofre de Layon Souza', part_tipo: 'ouvinte' },
      { periodo_id: 2, part_id: 1, part_nome: 'Layon de Souza Onofre', part_tipo: 'ouvinte' },
      { periodo_id: 2, part_id: 4, part_nome: 'de Onofre Souza Layon', part_tipo: 'ouvinte' }
    ]
  }
  */
  /*
  operacoes
  get
    eventos
    periodos
    relatorio evento
  post
    evento
    periodo
  put
    evento
    periodo
    configuracoes usuario
  del
    evento
    periodo
  */

  //listar eventos do usuario
  server.get("/controlePresenca/evento", function(req, res, next) {
    validateRequest.validate(req, res, db, function() {
      db.controlePresenca.find({
        usuario: req.params.token
      }, {
        _id:1, nome:1, ano:1, img:1
      }, function(err, list) {
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(list));
      });
    });
    return next();
  });

  //relatorio evento
  server.get('/controlePresenca/evento/detalhes/:id', function(req, res, next) {
    validateRequest.validate(req, res, db, function() {
      db.controlePresenca.find({
        _id: db.ObjectId(req.params.id)
      }, function(err, data) {
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
      });
    });
    return next();
  });

  //lista de periodos
  server.get('/controlePresenca/evento/periodos/:id', function(req, res, next) {
    validateRequest.validate(req, res, db, function() {
      db.controlePresenca.find({
        _id: db.ObjectId(req.params.id)
      }, {
        _id: 0, periodos: 1
      }, function(err, data) {
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
      });
    });
    return next();
  });

  //criar evento
  server.post('/controlePresenca/evento/:id', function(req, res, next) {
    validateRequest.validate(req, res, db, function() {
      var evento = req.params;
      db.controlePresenca.insert(evento,
        function(err, data) {
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(data));
        });
    });
    return next();
  });

  //criar períodos
  server.post('/controlePresenca/evento/periodo/:id', function(req, res, next) {
    validateRequest.validate(req, res, db, function() {
      var item = req.params;
      db.controlePresenca.update({
        _id: db.ObjectId(item._id)
      }, {
        $push: { periodos: item.periodo }
      }, function(err, data) {
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(data));
        });
    });
    return next();
  });

  //lançar presença
  server.post('/controlePresenca/evento/periodo/presenca/:id', function(req, res, next) {
    validateRequest.validate(req, res, db, function() {
      var item = req.params;
      db.controlePresenca.update({
        _id: db.ObjectId(item._id),
      }, {
        $push: { presencas: item.presenca }
      }, function(err, data) {
          res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
          });
          res.end(JSON.stringify(data));
        });
    });
    return next();
  });

  //remover evento
  server.del('/controlePresenca/evento/:id', function(req, res, next) {
    validateRequest.validate(req, res, db, function() {
      db.controlePresenca.remove({
        _id: db.ObjectId(req.params.id)
      }, function(err, data) {
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
      });
      return next();
    });
  });

  //remover período
  server.del('/controlePresenca/evento/periodo/:id', function(req, res, next) {
    validateRequest.validate(req, res, db, function() {
      db.controlePresenca.remove({
        _id: db.ObjectId(req.params._id)
      }, {
        $pull: { periodos: req.params.periodo_id }
      }, function(err, data) {
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
      });
      return next();
    });
  });
}
