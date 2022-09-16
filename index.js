const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
// const fetch = require("node-fetch");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("server running");
  res.send("Hello World!");
});

app.get("/getStatus", (req, res) => {
  res.send({ on: "true" });
});

app.get("/getSimilarArtists", (req, res) => {
  const artistId = req.query.artistId;
  var SpotifyWebApi = require("spotify-web-api-node");

  var clientId = process.env.spotifyClientId,
    clientSecret = process.env.spotifyClientSecret;
  var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
  });

  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      console.log("The access token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);
      spotifyApi.getArtistRelatedArtists(artistId).then(
        function (data) {
          res.send(data.body);
        },
        function (err) {
          res.send(err);
        }
      );
    },
    function (err) {
      console.log("Something went wrong when retrieving an access token", err);
    }
  );
});

app.get("/searchArtist", (req, res) => {
  // const spotifyAccessToken = 'BQDVO97fID87Lge1BEgMleIar4eB3FFfMxJo66ZQzpk7vSe9e1IlCHGuD1UybHu_LNuvx8F6oFizFzlW0wY6sJ5SN8Np-LDXkuVmIQen1lXNQXuf3wmoDEQaxdJIGDLhsto6Nrj2Q7Kc3Ju2fLtM7c-n8CYEzLY'
  const artist = req.query.artist;
  var SpotifyWebApi = require("spotify-web-api-node");

  var clientId = process.env.spotifyClientId,
    clientSecret = process.env.spotifyClientSecret;
  var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
  });

  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      console.log("The access token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);
      spotifyApi.searchArtists(artist).then(
        function (data) {
          res.send(data);
        },
        function (err) {
          console.error(err);
        }
      );
    },
    function (err) {
      console.log("Something went wrong when retrieving an access token", err);
    }
  );
});

app.get("/getArtistBio", (req, res) => {
  const artist = req.query.artist;
  const lastfm = require("lastfmapi");
  const lastfmAPI = new lastfm({
    api_key: process.env.lastFmAuthKey,
    secret: process.env.lastFmAuthSecret,
  });
  lastfmAPI.artist.getInfo({ artist: artist, limit: 10 }, (err, data) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.get("/getArtistDetails", (req, res) => {
  const artistId = req.query.artistId;
  var SpotifyWebApi = require("spotify-web-api-node");

  var clientId = process.env.spotifyClientId,
    clientSecret = process.env.spotifyClientSecret;
  var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
  });

  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      console.log("The access token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);
      spotifyApi.getArtist(artistId).then(
        function (data) {
          res.send(data.body);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    },
    function (err) {
      console.log("Something went wrong when retrieving an access token", err);
    }
  );
});

app.get("/getArtistTracks", (req, res) => {
  const artistId = req.query.artistId;
  var SpotifyWebApi = require("spotify-web-api-node");

  var clientId = process.env.spotifyClientId,
    clientSecret = process.env.spotifyClientSecret;
  var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
  });

  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      console.log("The access token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);
      spotifyApi.getArtistTopTracks(artistId, "GB").then(
        function (data) {
          res.send(data.body);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    },
    function (err) {
      console.log("Something went wrong when retrieving an access token", err);
    }
  );
});

app.get("/getSongs", (req, res) => {
  const songQuery = req.query.songQuery;
  var SpotifyWebApi = require("spotify-web-api-node");

  var clientId = process.env.spotifyClientId,
    clientSecret = process.env.spotifyClientSecret;
  var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
  });

  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      console.log("The access token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);
      spotifyApi.searchTracks(songQuery).then(
        function (data) {
          res.send(data.body);
        },
        function (err) {
          console.error(err);
        }
      );
    },
    function (err) {
      console.log("Something went wrong when retrieving an access token", err);
    }
  );
});

app.get("/getSimilarTracks", (req, res) => {
  const seedTrack = req.query.seedTrack;
  var SpotifyWebApi = require("spotify-web-api-node");

  var clientId = process.env.spotifyClientId,
    clientSecret = process.env.spotifyClientSecret;
  var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
  });

  spotifyApi.clientCredentialsGrant().then(function (data) {
    console.log("The access token expires in " + data.body["expires_in"]);
    console.log("The access token is " + data.body["access_token"]);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body["access_token"]);
    spotifyApi
      .getRecommendations({
        min_energy: 0.4,
        seed_tracks: [seedTrack],
        min_popularity: 50,
        limit: 40,
      })
      .then(
        function (data) {
          let recommendations = data.body;
          res.send(recommendations);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  });
});

app.get("/getPlaylist", (req, res) => {
  const playlistId = req.query.playlistId;
  var SpotifyWebApi = require("spotify-web-api-node");

  var clientId = process.env.spotifyClientId,
    clientSecret = process.env.spotifyClientSecret;
  var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
  });

  spotifyApi.clientCredentialsGrant().then(function (data) {
    console.log("The access token expires in " + data.body["expires_in"]);
    console.log("The access token is " + data.body["access_token"]);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body["access_token"]);

    spotifyApi.getPlaylist(playlistId)
  .then(function(data) {
    res.send(data.body)
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  });
});

app.listen(process.env.PORT || 8000);
