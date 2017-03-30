var moment = require('moment');


var JSON_transformation = function (doc,Callback){
  var playsArray = [];

  for(i=0;i<doc.length;i++){
    if (doc[i].PlayResult >= 0){ doc[i].PlayResult = 'Out'}
    if (doc[i].PlayResult == null){ doc[i].PlayResult = ''}
    if (doc[i].KorBB == 'OutonPitch'){ doc[i].KorBB = 'Strikeout'}
    if (doc[i].KorBB == null){ doc[i].KorBB = ''}
    if (doc[i].HitType == null){ doc[i].HitType = ''}
    if (doc[i].KorBB == null){ doc[i].KorBB = ''}
    if (doc[i].OutsonPlay == null){ doc[i].OutsonPlay = 0}
    if (doc[i].RunsScore == null){ doc[i].RunsScore = 0}

    var t_JSON ={
    'Date':moment(doc[i].Time).utcOffset(-7).format("MM/DD/YYYY"),
    'Time':moment(doc[i].Time).utcOffset(-7).format("HH:mm:ss"),
    'Pitcher':doc[i].PitcherLastName + ',' + doc[i].PitcherFirstName,
    'PitcherId': doc[i].PitcherId,
    'PitcherThrows': doc[i].PitcherThrows,
    'PitcherTeam':doc[i].PitcherTeam,
    'Batter':doc[i].BatterLastName + ',' + doc[i].BatterFirstName,
    'BatterId':doc[i].BatterId,
    'BatterSide': doc[i].BatterHits,
    'BatterTeam':doc[i].BatterTeam,
    'Inning':doc[i].Inning,
    'TopBottom':doc[i].TopBottom,
    'Outs':doc[i].Outs,
    'Balls':doc[i].Balls,
    'Strikes':doc[i].Strikes,
    'TaggedPitchType': doc[i].TaggedPitchType,
    'PitchCall':doc[i].PitchCall,
    'KorBB':doc[i].KorBB,
    'HitType':doc[i].HitType,
    'PlayResult':doc[i].PlayResult,
    'OutsonPlay':doc[i].OutsonPlay,
    'RunsScore':doc[i].RunsScore,
    'RelSpeed':doc[i].RelSpeed,
    'VerRelAngle':doc[i].VerRelAngle,
    'HorzRelAngle':doc[i].HorzRelAngle,
    'SpinRate':doc[i].SpinRate,
    'SpinAxis':doc[i].SpinAxis,
    'Tilt':doc[i].Tilt,
    'RelHeight':doc[i].RelHeight,
    'RelSide':doc[i].RelSide,
    'Extension':doc[i].Extension,
    'VertBreak':doc[i].VertBreak,
    'InducedVertBreak':doc[i].InducedVertBreak,
    'HorzBreak':doc[i].HorzBreak,
    'PlateLocHeight':doc[i].PlateLocHeight,
    'PlateLocSide':doc[i].PlateLocSide,
    'ZoneSpeed':doc[i].ZoneSpeed,
    'ExitSpeed':doc[i].ExitSpeed,
    'Angle':doc[i].Angle,
    'Direction':doc[i].Direction,
    'HitSpinRate':doc[i].HitSpinRate,
    'PositionAt110X':doc[i].PositionAt110X,
    'PositionAt110Y':doc[i].PositionAt110Y,
    'PositionAt110Z':doc[i].PositionAt110Z,
    'Distance':doc[i].Distance,
    'LastTrackedDistance':doc[i].LastTrackedDistance,
    'HangTime':doc[i].HangTime,
    'pfxx':doc[i].pfxx,
    'pfxz':doc[i].pfxz,
    'x0':doc[i].x0,
    'y0':doc[i].y0,
    'z0':doc[i].z0,
    'vx0':doc[i].vx0,
    'vy0':doc[i].vy0,
    'vz0':doc[i].vz0,
    'ax0':doc[i].ax0,
    'ay0':doc[i].ay0,
    'az0':doc[i].az0,
    "HomeTeam":doc[i].HomeTeam,
    "AwayTeam":doc[i].AwayTeam,
    "Stadium":doc[i].Stadium,
    "GameID":doc[i].GameID,
    'PitchUID':doc[i]._id
  }

    playsArray.push(t_JSON);

  }

  Callback(playsArray);
};



module.exports = JSON_transformation;
