# 🌊 WaterBox

WaterBox is a simple boilerplate for creating lightweight interactive pages using TypeScript, SQLite (with [sql.js](https://sql.js.org/)) and [Mustache](https://github.com/janl/mustache.js) templating. It's all glued together using [Parcel](https://parceljs.org/), and has some nice semantic styling from [Water.css](https://github.com/kognise/water.css).

See an example [here](https://brave-panini-a4cca2.netlify.app/).

# Quick Start

After cloning this repo, cd into the root of the repo and run `npm install` to install all dependencies, then run `npm start` to build and start the server, and visit http://localhost:4321 in your browser to see it.

Edit the data in `./static/db.sqlite` (I recommend using [DB Browser for SQLite](https://sqlitebrowser.org/)) to see the table change.

Edit the template in `./templates/main.mustache` to add things to the page.

Have a look at `./src/app.ts` to see the TypeScript that fetches the data from SQLite and renders it. You can replace this with whatever you like.

Bring up Developer Tools in your browser using <kbd>F12</kbd> and check out the console for log messages on templating and SQL querying. This will help you get started customizing those things.

# Building

WaterBox is 🚨not designed for production use🚨 but it can be built to be served statically, if you must. Just `npm run build` and grab the output from the `./dist/` folder and host wherever you like.
