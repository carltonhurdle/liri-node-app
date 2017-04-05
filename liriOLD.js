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

//twiter client object for the keys
var client = new Twitter({
 	consumer_key : keysReference.twitterKeys.consumer_key,
 	consumer_secret : keysReference.twitterKeys.consumer_secret,
 	access_token_key : keysReference.twitterKeys.access_token_key,
	access_token_secret : keysReference.twitterKeys.access_token_secret
});

//function for twitter
//var myTweets = function() {
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
//}


//function for Spotify
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
//}


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


//If statement for FS



