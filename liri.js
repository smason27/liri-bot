require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment")
var fs = require("fs");
var request = require('request');


var search1 = process.argv[2];
var search2 = process.argv.slice(3).join(" ")

// console.log(search2)

switch (search1) {
    case "concert-this":
        concertThis(search2);
        break;
    case "spotify-this-song":
        if (!search2) {
            spotifyThis("the sign")
        } else {
            spotifyThis(search2);
        }
        break;
    case "movie-this":
        if (!search2) {
            movieThis("mr+nobody")
        } else {
            movieThis(search2);
        }
        break;
    case "do-what-it-says":
        doWhatItSays(search2);
        break;
    default:
        console.log("accepted inputs are 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'")
}



function movieThis(search2) {

    var queryUrl = `http://www.omdbapi.com/?t=${search2}&tomoatoes=true&y=&plot=short&apikey=trilogy`

    axios.get(queryUrl).then(
        function (response) {
            // console.log(response);
            var movieData = response.data
            console.log(`---------
               \nTitle: ${movieData.Title}\nYear: ${movieData.Year}\nIMDB rating: ${movieData.imdbRating}\nRotten Tomatoes: ${movieData.Ratings[1].Value}\nCountry Produced: ${movieData.Country}\nLanguages: ${movieData.Language}\nPlot: ${movieData.Plot}\nActors: ${movieData.Actors}\n----------\n`
            )
        })
        .catch(function (error) {
            console.log("That didn't work! try another movie")
        });
}

function spotifyThis(search2) {

    var spotify = new Spotify(keys.spotify);

    spotify
        .search({ type: 'track', query: `${search2}` })
        .then(function (response) {
            //   console.log(response);
            songData = response.tracks.items
            // console.log(songData[0].album.name)
            //LOOP THROUGH AND LOG THE FIRST 5 
            for (i = 15; i < songData.length; i++) {
                console.log(
                    `----------
              \nArtist: ${songData[i].album.artists[0].name}\nSong Name: ${songData[i].name}\nAlbum: ${songData[i].album.name}\nLink to Album: ${songData[i].album.external_urls.spotify}\n----------\n`
                )
            }

        })
        .catch(function (err) {
            console.log("That didn't work! try another song!");
        });
}

function concertThis(search2) {
    let queryUrl = `https://rest.bandsintown.com/artists/${search2}/events?app_id=codingbootcamp`

    axios.get(queryUrl).then(
        function (response) {
            var concertData = response.data
            console.log(concertData[1].venue.name
            );
            for (i = 0; i < concertData.length; i++) {
                // console.log(concertData[i].venue.name)
                let start = moment(concertData[i].datetime).format("MM/DD/YYYY hh:mm A")
                // console.log(start)
                console.log(
                    `----------
                    \nVenue: ${concertData[i].venue.name}\nLocation: ${concertData[i].venue.city} ${concertData[i].venue.region}\nTime: ${start}
                    \n----------\n`
                );
            }
        })
        .catch(function (error) {
            console.log("That didn't work! try another artist!")
        });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf-8", function(error, data) {
        if(error) {
            console.log(error)
        }
        // console.log(data.slice(13));
        let doWhat = data.slice(1,2)
        // console.log(doWhat)
        if(doWhat === "s") {
            let song = data.slice(20)
            spotifyThis(song)
        } else if(doWhat === "c") {
            let concert = data.slice(15) 
            // console.log()
            concertThis(concert)
        } else {
            let movie = data.slice(13)
            console.log(movie)
            
            movieThis(movie)
        }
    })
}