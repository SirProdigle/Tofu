const approot = require("app-root-path");
const path = require("path");
module.exports = {
  port: process.env.PORT || "443",
  publicFolder: approot + '/Public',
  forceHTTPS: process.env.FORCE_HTTPS || false,
  viewDir: approot + '/Resources/Views',
  viewEngine: "<VIEW_ENGINE>"
};