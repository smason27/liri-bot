// require(dotenv).config();

var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var axios = require("axios")
var fs = require("fs");
var request = require('request');
var spotify = require('spotify');

var search1 = process.argv[2];
var search2 = process.argv[3];

console.log(search2)

switch (search1) {
    case "concert-this":
        concertThis(search2);
        break;
    case "spotify-this-song":
        spotify(search2);
        break;
    case "movie-this":
        movieThis(search2);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("accepted inputs are 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'")
}



function movieThis(search2) {
    var queryUrl = `http://www.omdbapi.com/?t=${search2}&y=&plot=short&apikey=trilogy`

    axios.get(queryUrl).then(
        function (response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error)
        });
}

function spotify(search2) {
    
 
spotify.search({ type: 'track', query: `${search2}` }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    } else {
        console.log(response)
    }
    
    // Do something with 'data'
});
}
