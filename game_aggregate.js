db['bb.games'].aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: {
				"Time":{$gt:'2016-03-20',$lte:'2017-03-25'}
			}
		},

		// Stage 2
		{
			$project: {
			    _id:true,
			    Time:true,
			    Name:true,
			    "Location":"$Location.Venue.Name",
			    "HomeTeam":"$HomeTeam.TeamName",
			    "AwayTeam":"$AwayTeam.TeamName",
			    
			    
			}
		},

	]

	// Created with 3T MongoChef, the GUI for MongoDB - https://3t.io/mongochef

);
