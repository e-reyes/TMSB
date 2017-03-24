//mongoose Schema for game collection//
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var playSchema = new Schema ({
  _id: String


},{collection:'bb.plays'});

module.exports = mongoose.model('Play', playSchema);
