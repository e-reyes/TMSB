// include packages & models //
var mongoose = require ('mongoose');
var Game = require('./models/game.js');
var Play = require('./models/play.js');
var converter = require('json-2-csv');
var fs = require('fs');
var t = require('./helpers/formatJSON.js')

// Callback funtion to write data to a CSV file

var json2csvCallback = function (err, csv) {
    if (err) throw err;

    fs.writeFile('test.csv', csv, function(err){
      if (err) throw err;
      console.log('It\'s saved!');
    });
  };

var options = {
    delimiter : {
       wrap  : '"', // Double Quote (") character
       field : ',', // Comma field delimiter
       array : ';', // Semicolon array value delimiter
       eol   : '\r\n' // Newline delimiter
     },
     checkSchemaDifferences:false
  };



// Connect to mongoDB //

var TMSB_db =  //connection string
mongoose.connect(TMSB_db, function(err){
  if (err) throw err;
  console.log("Connection" + " to "+ TMSB_db + " Sucessful!")
});

//Example query//

Play.aggregate(

  [
    // Stage 1
    {
      $match: {
      "Game.Id":"b3ee5601-fb38-40e2-b0e2-b11d559ae86f", "Kind":"Play"
      }
    },

    // Stage 2
    {
      $unwind: {
          path : "$Players",
          includeArrayIndex : "arrayIndex", // optional
          preserveNullAndEmptyArrays : false // optional
      }
    },

    // Stage 3
    {
      $match: {
          $or:[{"Players.Position":"P"},{"Players.Position":"B"}]
      }
    },

    // Stage 4
    {
      $group: {
          _id:"$_id",
          "Time":{$first:"$Time"},
          "Player":{$push:"$Players"},
          "Game":{$first:"$Game"},
          "PlayResult":{$first:"$PlayResult.Data"},
          "GameState":{$first:"$GameState"},
          "Measurement":{$first:"$Measurement"}


      }
    },

    // Stage 5
    {
      $project: {
          // Metadata
          "Time":true,
          'Pitcher':{
            $filter:{
                input:'$Player',
                as:'p',
                cond:{$eq:['$$p.Position',"P"]}
              }
         },
         'Batter':{
            $filter:{
                input:'$Player',
                as:'b',
                cond:{$eq:['$$b.Position',"B"]}
              }
         },

          "Inning":"$GameState.Inning",
          "TopBottom":"$GameState.TopBottom",
          "Outs":"$GameState.TotalOuts",
          "Balls":"$GameState.TotalBalls",
          "Strikes":"$GameState.TotalStrikes",
          "TaggedPitchType":"$PlayResult.PitchType",
          "PitchCall":{$ifNull:["$PlayResult.PitchCall","$PlayResult.PitchResult"]},
          "KorBB":{$ifNull:['$PlayResult.StrikeOut','$PlayResult.Walk']},

          "HitType":"$PlayResult.HitType",
          "PlayResult":{$ifNull:["$PlayResult.Outs","$PlayResult.Hit"]},
          "OutsonPlay":"$PlayResult.OutsonPlay",
          "RunsScore":"$PlayResult.Runs",
          //Measurements

          "RelSpeed":{$ifNull:[{$multiply:["$Measurement.Pitch.Release.Speed",2.23694]},""]},
          "VerRelAngle":{$ifNull:[{$multiply:["$Measurement.Pitch.Release.Angle",57.2958]},""]},
          "HorzRelAngle":{$ifNull:[{$multiply:["$Measurement.Pitch.Release.Direction",57.2958]},""]},
          "SpinRate":{$ifNull:[{$divide:["$Measurement.Pitch.Release.SpinRate",0.0166666666667]},""]},
          "SpinAxis":{$ifNull:[{$multiply:["$Measurement.Pitch.Release.SpinAxis",57.2958]},""]},
          "Tilt":{$ifNull:["$Measurement.Pitch.Release.SpinAxisTilt",""]},
          "RelHeight":{$ifNull:[{$multiply:["$Measurement.Pitch.Release.Height",3.28084]},""]},
          "RelSide":{$ifNull:[{$multiply:["$Measurement.Pitch.Release.Side",3.28084]},""]},
          "Extension":{$ifNull:[{$multiply:["$Measurement.Pitch.Release.Extension",3.28084]},""]},
          "VertBreak":{$ifNull:[{$multiply:["$Measurement.Pitch.Trajectory.VerticalBreak",39.3701]},""]},
          "InducedVertBreak":{$ifNull:[{$multiply:["$Measurement.Pitch.Trajectory.InducedVerticalBreak",39.3701]},""]},
          "HorzBreak":{$ifNull:[{$multiply:["$Measurement.Pitch.Trajectory.HorizontalBreak",39.3701]},""]},
          "PlateLocHeight":{$ifNull:[{$multiply:["$Measurement.Pitch.Location.Height",3.28084]},""]},
          "PlateLocSide":{$ifNull:[{$multiply:["$Measurement.Pitch.Location.Side",3.28084]},""]},
          "ZoneSpeed":{$ifNull:[{$multiply:["$Measurement.Pitch.Location.Speed",2.23694]},""]},
          "ExitSpeed":{$ifNull:[{$multiply:["$Measurement.Hit.Launch.Speed",2.23694]},""]},
          "Angle":{$ifNull:[{$multiply:["$Measurement.Hit.Launch.Angle",57.2958]},""]},
          "Direction":{$ifNull:[{$multiply:["$Measurement.Hit.Launch.Direction",57.2958]},""]},
          "HitSpinRate":{$ifNull:[{$divide:["$Measurement.Hit.Launch.SpinRate",0.0166666666667]},""]},
          "PositionAt110X":{$ifNull:[{$multiply:["$Measurement.Hit.Trajectory.HitAt110Feet.Position.X",3.28084]},""]},
          "PositionAt110Y":{$ifNull:[{$multiply:["$Measurement.Hit.Trajectory.HitAt110Feet.Position.Y",3.28084]},""]},
          "PositionAt110Z":{$ifNull:[{$multiply:["$Measurement.Hit.Trajectory.HitAt110Feet.Position.Z",3.28084]},""]},
          "Distance":{$ifNull:[{$multiply:["$Measurement.Hit.Landing.Distance",3.28084]},""]},
          "LastTrackedDistance":{$ifNull:[{$multiply:["$Measurement.Hit.LastMeasured.Distance",3.28084]},""]},
          "HangTime":{$ifNull:["$Measurement.Hit.Landing.Time",""]},
          "pfxx":{$ifNull:[{$multiply:["$Measurement.Pitch.PfxData.PfxHorz",39.3701]},""]},
          "pfxz":{$ifNull:[{$multiply:["$Measurement.Pitch.PfxData.PfxVert",39.3701]},""]},
          "x0":{$ifNull:[{$multiply:["$Measurement.Pitch.PfxData.X0.X",3.28084]},""]},
          "y0":{$ifNull:[{$multiply:["$Measurement.Pitch.PfxData.X0.Y",3.28084]},""]},
          "z0":{$ifNull:[{$multiply:["$Measurement.Pitch.PfxData.X0.Z",3.28084]},""]},
          "vx0":{$ifNull:[{$multiply:["$Measurement.Pitch.PfxData.V0.X",3.28084]},""]},
          "vy0":{$ifNull:[{$multiply:["$Measurement.Pitch.PfxData.V0.Y",3.28084]},""]},
          "vz0":{$ifNull:[{$multiply:["$Measurement.Pitch.PfxData.V0.Z",3.28084]},""]},
          "ax0":{$ifNull:[{$multiply:["$Measurement.Pitch.PfxData.A0.X",3.28084]},""]},
          "ay0":{$ifNull:[{$multiply:["$Measurement.Pitch.PfxData.A0.Y",3.28084]},""]},
          "az0":{$ifNull:[{$multiply:["$Measurement.Pitch.PfxData.A0.Z",3.28084]},""]},
          "HomeTeam":"$Game.HomeTeam.Name",
          "AwayTeam":"$Game.AwayTeam.Name",
          "Stadium":"$Game.Location.Venue.Name",
          "GameID":"$Game.Id",
      }
    },

    // Stage 6
    {
      $unwind: {
          path :"$Pitcher",
          includeArrayIndex : "arrayIndex", // optional
          preserveNullAndEmptyArrays : false // optional
      }
    },

    // Stage 7
    {
      $unwind: {
          path : "$Batter",
          includeArrayIndex : "arrayIndex", // optional
          preserveNullAndEmptyArrays : false // optional
      }
    },

    // Stage 8
    {
      $project: {
         "_Id":true,
         "Time":true,
         "PitcherLastName":"$Pitcher.LastName",
         "PitcherFirstName":"$Pitcher.FirstName",
         "PitcherId":"$Pitcher.Id",
         "PitcherThrows":"$Pitcher.Throws",
         "PitcherTeam":{$cond:{ if:{ $eq:["$TopBottom","Top"]},then:"$HomeTeam",else:"$AwayTeam"}},
         "BatterLastName":"$Batter.LastName",
         "BatterFirstName":"$Batter.FirstName",
         "BatterId":"$Batter.Id",
         "BatterHits":"$Batter.Hits",
         "BatterTeam":{$cond:{ if:{ $eq:["$TopBottom","Bottom"]},then:"$HomeTeam",else:"$AwayTeam"}},
         "Inning":true,
         "TopBottom":true,
         "Outs":true,
         "Balls":true,
         "Strikes":true,
         "TaggedPitchType":true,
         "PitchCall":true,
         "KorBB":true,
         "HitType":true,
         "PlayResult":true,
         "OutsonPlay":true,
         "RunsScore":true,
         "RelSpeed":true,
         "VerRelAngle":true,
         "HorzRelAngle":true,
         "SpinRate":true,
         "SpinAxis":true,
         "Tilt":true,
         "RelHeight":true,
         "RelSide":true,
         "Extension":true,
         "VertBreak":true,
         "InducedVertBreak":true,
         "HorzBreak":true,
         "PlateLocHeight":true,
         "PlateLocSide":true,
         "ZoneSpeed":true,
         "ExitSpeed":true,
         "Angle":true,
         "Direction":true,
         "HitSpinRate":true,
         "PositionAt110X":true,
         "PositionAt110Y":true,
         "PositionAt110Z":true,
         "Distance":true,
         "LastTrackedDistance":true,
         "HangTime":true,
         "pfxx":true,
         "pfxz":true,
         "x0":true,
         "y0":true,
         "z0":true,
         "vx0":true,
         "vy0":true,
         "vz0":true,
         "ax0":true,
         "ay0":true,
         "az0":true,
         "HomeTeam":true,
         "AwayTeam":true,
         "Stadium":true,
         "GameID":true,
      }
    },

    // Stage 9
    {
      $sort: {
          "Time":1
      }
    },

  ]
	// Created with 3T MongoChef, the GUI for MongoDB - https://3t.io/mongochef

,function(err,doc) {
if(err) {return handleError(err);}
else{
  //console.log(doc[1]);
  //converter.json2csv(doc, json2csvCallback,options);
  t(doc,function(x){converter.json2csv(x, json2csvCallback,options)});

  }
});
