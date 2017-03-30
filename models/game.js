//mongoose Schema for game collection//
var mongoose = require ('mongoose');

var Schema = mongoose.Schema;

var gameSchema = new Schema ({
  _id: String,
  Time:String,
  Kind:String,
  Name:String,
  Event:{
    Id:String,
    Name:String,
    Organization:{
      Id:String,
      Name:String,
    }
  },
  Location:{
    Venue:{
      Id:String,
      Name:String
    },
    Field:{
      Id:String,
      Name:String
    }
  },
  HomeTeam:{
    Id:String,
    TeamName:String
  },
  AwayTeam:{
    Id:String,
    TeamName:String
  },
  State:{
    IsComplete:Boolean,
    IsVerified:Boolean,
    HasIssues:Boolean,
    StartTime:String
  },
  PlayCount:Number,
  Updated:String

},{collection:'bb.games'});

module.exports = mongoose.model('Game', gameSchema);
