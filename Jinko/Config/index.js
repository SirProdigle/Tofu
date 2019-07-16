const path = require('path');
const ToBool = require("to-bool");
const config = {};

config.express = require('./express');
config.general = require('./general');
config.db = require('./db');

module.exports = config;