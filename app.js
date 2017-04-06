// Require packages //
var games = require('./src/games.js');
var generateCSV = require('./src/generateCSV');
var moment = require('moment');
var schedule = require('node-schedule');
var db = require('./database/db.js');
var mongoose = require ('mongoose');




var DateRange = {start_date:'2017-03-28', end_date:'2017-03-31'};



 job = schedule.scheduleJob('19 * * * * ',function(){
   //Connect to Softball Database
   mongoose.connect(db, function(err){
     if (err) throw err;
     console.log("Connection" + " to "+ db + " Sucessful!")
   });
   games.listGamesByDate(DateRange,function(games){

     for(i=0; i < games.length; i++){
       var fn = moment(games[i].Time).utcOffset(-7).format("MM-DD-YYYY") + " " + games[i].AwayTeam + "-"+(i+1);
       console.log(fn)
       generateCSV(games[i]._id,fn)
     }
   });
   mongoose.connection.close();
 });
