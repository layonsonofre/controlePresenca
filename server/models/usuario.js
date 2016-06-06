var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var SchemaUsuario = new Schema({
  nome: {
    type: String,
    unique: false,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  senha: {
    type: String,
    required: true
  }
});

SchemaUsuario.pre('save', function (next) {
  var user = this;
  if (this.isModified('senha') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.senha, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.senha = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

SchemaUsuario.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.senha, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Usuario', SchemaUsuario);
