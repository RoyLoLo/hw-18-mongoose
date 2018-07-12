const mg = require('mongoose');
const schema = mg.Schema;

let SS = new schema({
  title : {
    type : String,
    // required : true
  },
  img : {
    type : String,
    // required : true
  },
  link : {
    type : String,
    // required : true
  }
});

let Story = mg.model("Story", SS);

module.exports = Story;