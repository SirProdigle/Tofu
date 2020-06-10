const appRoot = require("app-root-path");
const path = require("path");
module.exports = {
  port: process.env.PORT || "443",
  publicFolder: appRoot + '/Public',
  forceHTTPS: process.env.FORCE_HTTPS || false,
  viewDir: appRoot + '/Resources/Views',
  viewEngine: "<VIEW_ENGINE>"
};