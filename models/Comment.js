const mg = require('mongoose');

const schema = mg.Schema;

let score = new schema({
    comment : String,
    score : Number
});

let S = mg.model('Comment',score);

module.exports = S;