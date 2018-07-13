const mg = require('mongoose');
const schema = mg.Schema;

let SS = new schema({
  title : {
    type : String,
    required : true
  },
  img : {
    type : String,
    required : true
  },
  link : {
    type : String,
    unique : true,
    required : true
  }
});

let Shoe = mg.model("Shoe", SS);

module.exports = Shoe;