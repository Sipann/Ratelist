const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const fetch = require('node-fetch');

const db = require('../models');
require('dotenv').config();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: process.env.SPOTIFY_REDIRECT_URI
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      process.nextTick(async function () { // if user does not exist, user stored in db.Users
        const userExists = await fetch(`${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/users/${profile.username}`);
        if (userExists === null) await fetch(`${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userName: profile.username })
        });
        return done(null, { profile, accessToken, refreshToken, expires_in });
      });
    }
  )
);
