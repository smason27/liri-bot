require(dotenv).config();

var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var fs = require("fs")