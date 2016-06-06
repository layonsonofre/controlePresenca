var validateRequest = require("./auth/validateRequest");
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('controlepresenca', ['usuarios', 'controlePresenca']);

/*
//Exemplo da collection
db.controlePresenca.insert({
  _id: 1,
  nome: 'Semana da Física',
  ano: 2016,
  img: '/path/to/image.format',
  email: 'layonsonofre@gmail.com',
  nomeUsuario: 'Layon de Souza Onofre',
  senha: 'senhacriptografadacombcrypt',
  periodos: [
    { periodo_id: 1, data: '15/15/2015', hora_inicio: '19h10', hora_fim: '20h00', descricao: 'Palestra do Reitor',
      presencas: [
        { part_id: 2, part_nome: 'Onofre de Layon Souza', part_tipo: 'ouvinte' },
        { part_id: 1, part_nome: 'Layon de Souza Onofre', part_tipo: 'ouvinte' },
        { part_id: 3, part_nome: 'Souza de Onofre Layon', part_tipo: 'organizador' },
        { part_id: 4, part_nome: 'de Onofre Souza Layon', part_tipo: 'ouvinte' },
      ]
    },
    { periodo_id: 2, data: '15/15/2015', hora_inicio: '20h10', hora_fim: '21h00', descricao: 'Palestra da EJEC',
      presencas: [
        { part_id: 3, part_nome: 'Souza de Onofre Layon', part_tipo: 'organizador' },
        { part_id: 2, part_nome: 'Onofre de Layon Souza', part_tipo: 'ouvinte' },
        { part_id: 1, part_nome: 'Layon de Souza Onofre', part_tipo: 'ouvinte' },
        { part_id: 4, part_nome: 'de Onofre Souza Layon', part_tipo: 'ouvinte' }
      ]
    }
  ]
})

db.controlePresenca.insert({
  _id: 2,
  nome: 'I Semana de Integracao da Tecnologia e Empreendedorismo',
  ano: 2015,
  img: '/path/to/image.format',
  usuario: 'layonsonofre@outlook.com',
  senha: 'senhacriptografadacombcrypt',
  periodos: [
    { periodo_id: 1, data: '30/30/2015', hora_inicio: '10h50', hora_fim: '12h00', descricao: 'Palestra do Ariangelo',
      presencas: [
        { part_id: 2, part_nome: 'Qwerty2', part_tipo: 'ouvinte' },
        { part_id: 1, part_nome: 'Qwerty1', part_tipo: 'ouvinte' },
        { part_id: 3, part_nome: 'Qwerty3', part_tipo: 'organizador' },
        { part_id: 4, part_nome: 'Qwerty4', part_tipo: 'ouvinte' },
      ]
    },
    { periodo_id: 2, data: '30/30/2015', hora_inicio: '12h10', hora_fim: '14h00', descricao: 'Palestra do Centro Acadêmico',
      presencas: [
        { part_id: 3, part_nome: 'Qwerty3', part_tipo: 'organizador' },
        { part_id: 2, part_nome: 'Qwerty2', part_tipo: 'ouvinte' },
        { part_id: 1, part_nome: 'Qwerty1', part_tipo: 'ouvinte' },
        { part_id: 4, part_nome: 'Qwerty4', part_tipo: 'ouvinte' }
      ]
    }
  ]
})
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
router.get("/controlePresenca/evento", function(req, res) {
  console.log(req.params);
  validateRequest.validate(req, res, db, function() {
    db.controlePresenca.find({
      email: req.params.email
    }, {
      _id:1, nome:1, ano:1, img:1
    }, function(err, list) {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
      });
      res.end(JSON.stringify(list));
    });
  });
});

//relatorio evento
router.get('/controlePresenca/evento/detalhes/:id', function(req, res) {
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
});

//lista de periodos
router.get('/controlePresenca/evento/periodos/:id', function(req, res) {
  validateRequest.validate(req, res, db, function() {
    db.controlePresenca.find({
      _id: db.ObjectId(req.params.id)
    }, {
      "periodos.presencas": 1
    }, function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
      });
      res.end(JSON.stringify(data));
    });
  });
});

//criar evento
router.post('/controlePresenca/evento', function(req, res) {
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
});

//criar períodos
router.post('/controlePresenca/evento/periodo/:id', function(req, res) {
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
});

//lançar presença
router.post('/controlePresenca/evento/periodo/presenca/:id', function(req, res) {
  validateRequest.validate(req, res, db, function() {
    var item = req.params;
    db.controlePresenca.update({
      _id: db.ObjectId(item._id),
      "periodos.periodo_id": { $in: [ item.periodo_id ] }
    }, {
      $push: { "periodos.$.presencas": item.presenca }
    }, function(err, data) {
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
      });
  });
});

//remover evento
router.delete('/controlePresenca/evento/:id', function(req, res) {
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
router.delete('/controlePresenca/evento/periodo/:id', function(req, res) {
  validateRequest.validate(req, res, db, function() {
    db.controlePresenca.remove({
      _id: db.ObjectId(req.params._id)
    }, {
      $pull: { periodos: { periodo_id: req.params.periodo_id } }
    }, function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
      });
      res.end(JSON.stringify(data));
    });
    return next();
  });
});

module.exports = router;
