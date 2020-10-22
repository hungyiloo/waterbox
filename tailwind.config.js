const colors = require('./colors');

module.exports = {
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
