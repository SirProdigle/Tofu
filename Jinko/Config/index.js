const path = require('path');
const config = {};

config.express = require('./express');
config.general = require('./general');
config.db = require('./db');

module.exports = config;