'use strict';

const express = require('express');
const router = require('./router');
const cors = require('cors');
const passport = require('passport');
const dbConnection = require('./models/index.js'); // eslint-disable-line no-unused-vars
const spotifyAuthSetup = require('./services/spotify'); // eslint-disable-line no-unused-vars
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(router);

app.listen(PORT, console.log(`* Server running on port ${PORT}`)); // eslint-disable-line no-console
