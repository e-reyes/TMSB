var fs = require('fs');
var dropbox = require('dropbox');
var p = '/NCAA reports/AZ Softball/GameData/';
var AccessToken ='LF-3mQtGe3AAAAAAAAAAD8umjtxb8qjv4N64h3_sW3ZuzliimBX49rQAWUS9wztp';
var dbx = new dropbox({accessToken:AccessToken});



  var dropboxCSV = function (csv,filename) {


      dbx.filesUpload({path:p+filename+'.csv',contents:csv})
        .then(function(response){

        console.log(response)
        })
        .catch(function(error){
          console.error();
        })
  };

  var localCSV = function (err,csv) {
          if (err) throw err;

          fs.writeFile('filename', csv, function(err){
            if (err) throw err;
            console.log('It\'s saved!');
          });
  };


module.exports = {localCSV:localCSV, dropboxCSV:dropboxCSV}
