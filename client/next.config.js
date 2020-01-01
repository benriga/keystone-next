require("dotenv").config();

const serverUrl = process.env.SERVER_URL || "http://localhost:3000";

const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    serverUrl
  }
});
