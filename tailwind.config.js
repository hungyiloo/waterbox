const colors = require('./colors');

module.exports = {
  purge: [
    "templates/**/*.mustache",
    "index.html"
  ],
  important: "#app",
  theme: {
    colors, // edit the default theme colors in colors.js
    extend: {
      screens: {
        'dark': {'raw': '(prefers-color-scheme: dark)'},
        // => @media (prefers-color-scheme: dark) { ... }
      }
    }
  }
}
