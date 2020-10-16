# 🚀 Prototypr

Prototypr is a simple boilerplate for creating lightweight interactive pages using TypeScript, SQLite (with [sql.js](https://sql.js.org/)) and [Mustache](https://github.com/janl/mustache.js) templating.

# Quick Start

After cloning, run `npm install` in the root of the repo to install all dependencies, then `npm start` to run the example, and visit http://localhost:4321 in your browser to see it.

Edit the data in `./static/db.sqlite` (I recommend using [DB Browser for SQLite](https://sqlitebrowser.org/)) to see the table change.

Edit the template in `./templates/main.mustache` to add things to the page.

Have a look at `./src/app.ts` to see the TypeScript that fetches the data from SQLite and renders it. You can replace this with whatever you like.
