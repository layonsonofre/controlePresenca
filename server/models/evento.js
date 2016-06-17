var mongoose = require('mongoose');
var Usuario = require('./usuario');
var Schema = mongoose.Schema;

var SchemaEvento = new Schema({
  nome: {
    type: String,
    unique: false,
    required: true
  },
  dataInicio: {
    type: Date,
    unique: false,
    required: true
  },
  dataFim: {
    type: Date,
    unique: false,
    required: true
  },
  periodos: [],
  // COMO FAZER PRA GUARDAR A IMAGEM?
  usuario: {
    type: Schema.ObjectId,
    ref: 'Usuario'
  }
});

module.exports = mongoose.model('Evento', SchemaEvento);
