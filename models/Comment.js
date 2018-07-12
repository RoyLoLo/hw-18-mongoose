const mg = require('mongoose');

const schema = mg.Schema;

let CS = new schema({
  name : String,
  comment : String
});

let C = mg.model('Comment',CS);

module.exports = C;