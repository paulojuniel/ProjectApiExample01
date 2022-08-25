const moongose = require('mongoose');

const Person = moongose.model('Person', {
  nome: String,
  salary: Number,
  approved: Boolean,
});

module.exports = Person;