var converter = require('json-2-csv');
var jsonTransformation = require('../helpers/formatJSON.js');
var writeCSV = require('../helpers/writeCSV.js');
var games = require('../src/games.js');




var options = {
    delimiter : {
       wrap  : '"', // Double Quote (") character
       field : ',', // Comma field delimiter
       array : ';', // Semicolon array value delimiter
       eol   : '\r\n' // Newline delimiter
     },
     checkSchemaDifferences:false
  };

generateCSV = function (gameID,filename) {
  //Get all plays from a specified GameID
  games.getGameData(gameID,function(plays){
    // Transfored plays JSON to a desired format
    jsonTransformation(plays,function(t_plays){
      //Convert transformed JSON to CSV

    converter.json2csv(t_plays,function(err,csv){
        // Write CSV into dropbox folder

        writeCSV.dropboxCSV(csv,filename);
      },options)
    })


    })
};



module.exports = generateCSV;
