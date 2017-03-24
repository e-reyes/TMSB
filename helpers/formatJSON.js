var moment = require('moment');


var testJSON = [{
  _id: '83f3c171-6a58-4d68-abb0-1b47d7b0ca98',
  Time: '2016-03-04T02:08:27.6622708Z',
  Inning: 1,
  TopBottom: 'Top',
  Outs: 0,
  Balls: 0,
  Strikes: 2,
  TaggedPitchType: 'Changeup',
  PitchCall: 'FoulBall',
  PlayResult:2,
  RelSpeed: 58.50890304401948,
  VerRelAngle: 4.1190453063803,
  SpinRate: 916.4333930950911,
  SpinAxis: 223.48179461695136,
  Tilt: '1:30',
  RelHeight: 1.9828802457738786,
  RelSide: -1.2258961810793365,
  Extension: 6.211534106191787,
  VertBreak: -27.66028185656917,
  InducedVertBreak: 9.275218516608374,
  HorzBreak: 8.829163934599276,
  PlateLocHeight: 2.2275383202081045,
  PlateLocSide: 1.039500826090942,
  ZoneSpeed: 52.279478455657966,
  ExitSpeed: '',
  Angle: '',
  Direction: '',
  HitSpinRate: '',
  PositionAt110X: '',
  PositionAt110Y: '',
  PositionAt110Z: '',
  Distance: '',
  LastTrackedDistance: '',
  pfxx: -9.214519384322621,
  pfxz: 8.909721696194422,
  x0: 1.7087909550023024,
  y0: 50.00000160000003,
  z0: 0.7535243276570343,
  vx0: -2.670897909600064,
  vy0: -88.73254360248681,
  vz0: 10.049838879679408,
  ax0: -6.772381741333905,
  ay0: 21.241848661730103,
  az0: -25.625684552622907,
  HomeTeam: 'Arizona Wildcats',
  AwayTeam: 'BYU Cougars',
  Stadium: 'Hillenbrand Memorial Stadium',
  GameID: 'b3ee5601-fb38-40e2-b0e2-b11d559ae86f',
  PitcherFirstName : "Danielle",
  PitcherLastName: 'Toole',
  PitcherId: 'ce3c344c-ccfb-4369-ae96-6d47a0d2ea77',
  PitcherThrows: 'L',
  PitcherTeam: 'Arizona Wildcats',
  BatterLastName: 'Bravo',
  BatterFirstName: 'Gordy',
  BatterId: 'e6d99852-5677-4e60-991b-da4bc5043506',
  BatterHits: 'L',
  BatterTeam: 'BYU Cougars' }]




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


//JSON_transformation(testJSON,function(t){console.log(t)});

module.exports = JSON_transformation;
