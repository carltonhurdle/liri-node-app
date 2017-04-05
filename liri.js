//variable to store the keys.js file with the ./
var keysReference = require('./keys.js');
//variable for the process.argv array
var nodeArg = process.argv;
//variable for the nodeArg and inputs
var inputA = nodeArg[2];
//variable for the second request to string together
var inputB = "";
//variable for twitter
var Twitter = require('twitter');
//variable for spotify
var spotify = require('spotify');
//variable for OMDBrequest
var request = require('request');
//fs for reading and writing packages
var fs = require("fs");

//For loop for inputB, so when someone puts 
// in a song title, it will string together.
//starts at the 3rd index because it only needs to be
//used when a user puts in something like a song title.
for (var i = 3; i < process.argv.length; i++){
  inputB = inputB + " " + process.argv[i];
}




//function for twitter
var GetMyTweets = function() {
	//twiter client object for the keys
	var client = new Twitter({
	 	consumer_key : keysReference.twitterKeys.consumer_key,
	 	consumer_secret : keysReference.twitterKeys.consumer_secret,
	 	access_token_key : keysReference.twitterKeys.access_token_key,
		access_token_secret : keysReference.twitterKeys.access_token_secret
	});

	//If statement for twitter
	if (inputA == "my-tweets") {
	   var params = {screen_name: 'carltonhurdle'};
	    }
	    client.get('statuses/user_timeline', params, function(error, tweets, response) {
	      if (!error) {
	        //for loop is set to 20 because it starts at 0
	        for (var i = 0; i < 20; i++) { 
	        //text is the only property in the twitter object that displays tweets
	        console.log("Tweet: " + tweets[i].text + "\n" + "Created: " + tweets[i].created_at + "\n"); 
	        }
	      };
	    });
}


var GetArtistNames = function(artist) {
	return artist.name;
}
var GetMeSpotify = function(songName) {
spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 	//console.log(data.tracks.items[0]); 
 	var songs = data.tracks.items;
 	for(var i = 0; i < songs.length; i++) {
 		console.log(i);
 		console.log('artist(s): ' + songs[i].artists.map(GetArtistNames));
 		console.log('song name: ' + songs[i].name);
 		console.log('previews song: ' + songs[i].preview_url); 
 		console.log('-------------------------------------------');
 	}
});
}

/*
//function for Spotify---------------------
//var songSpotify = function(spotifyThisSong) {
//If statement for Spotify
if (inputA == "spotify-this-song"){
    console.log(spotify);
    spotify.search({ type: 'track', query: inputB }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
            default: 
         }
        for (var i = 0; i < data.tracks.items.length; i++){
          console.log("Song Name: " + data.tracks.items[i].name);
          console.log("Song Short URL: " + data.tracks.items[i].album.uri);
          console.log("Song Album Name: " + data.tracks.items[i].alubm.name);
        }
            console.log(data.tracks.items[0]); 
    });
 }
//}--------------------------------
*/

var GetMeMovie = function(movieName) {
	request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json', function (error, response, body){
		if(!error && response.statusCode == 200) {
			
			var jsonData = JSON.parse(body); 

			console.log('Title: ' + jsonData.Title);
			console.log('Year: ' + jsonData.Year);
			console.log('Rated: ' + jsonData.Rated);
			console.log('IMDB Rating: ' + jsonData.imdbRating);
			console.log('Country: ' + jsonData.Country);
			console.log('Language: ' + jsonData.Language);
			console.log('Plot: ' + jsonData.Plot);
			console.log('Actors: ' + jsonData.Actors);
			console.log('Rotten tomatoes rating: ' + jsonData.tomatoRating);
			console.log('Rotten tomatoes rating: ' + jsonData.tomatoURL);
		}
	});
}


var doWhatItSays = function(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err) throw err;

		var dataArr = data.split(',');

		if(dataArr.length == 2) {
			pick(dataArr[0], dataArr[1]);
		} else if (dataArr.length == 1) {
			pick(dataArr[0]);
		}
	});
}

/*
//If statement for OMDB
  if (inputA == "movie-this") {
    request
  .get(inputB.title.)
  .on('response', function(response) {
    console.log(this.response.statusCode) 
  })
      if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
}
*/


//If statement for FS

//switch statement for liribot
var pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets' :
			GetMyTweets();
			break;
		case 'spotify-this-song': 
			GetMeSpotify(functionData);
			break;
		case 'movie-this':
			GetMeMovie(functionData);
			break;
		case 'do-what-it-says':
			doWhatItSays();
			break;
		default:
		console.log('LIRI does not know that');
	}
}

var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);



