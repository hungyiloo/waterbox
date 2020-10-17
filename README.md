# 🌊 WaterBox

WaterBox is a simple boilerplate for creating lightweight interactive pages using TypeScript, SQLite (with [sql.js](https://sql.js.org/)) and [Mustache](https://github.com/janl/mustache.js) templating. It's all glued together using [Parcel](https://parceljs.org/), and has some nice semantic styling from [Water.css](https://github.com/kognise/water.css).

See an example [here](https://brave-panini-a4cca2.netlify.app/).

# Quick Start

After cloning this repo, cd into the root of the repo and run `npm install` to install all dependencies, then run `npm start` to build and start the server, and visit http://localhost:4321 in your browser to see it.

Edit the data in `./static/db.sqlite` (I recommend using [DB Browser for SQLite](https://sqlitebrowser.org/)) to see the HTML table change.

Edit the template in `./templates/main.mustache` to add things to the page.

Have a look at `./src/main.ts` to see the `main()` method, written in TypeScript, that fetches the data from SQLite and renders it onto the page. You can replace this with whatever you like.

Bring up Developer Tools in your browser using <kbd>F12</kbd> and check out the console for log messages on templating and SQL querying. This will help you get started customizing those things.

# Don't Need Mustache?

You don't have to use it. Just ignore the templates and remove any `renderContainer` calls from `main.ts`. You can hand craft your markup in `index.html` or construct it all entirely within TypeScript/JavaScript.

# How to Load External Libraries

If you need another library, the best way is to find the package on https://www.npmjs.com/ and `import` the package properly in TypeScript. You might also have to install a corresponding `@types` package to get TypeScript more happy with your import. This works well, but takes a long time.

For example, to load [Leaflet](https://leafletjs.com/examples/quick-start/) properly, with all typings:

1. `npm install --save-dev leaflet @types/leaflet`
2. Add `<link rel="stylesheet" href="node_modules/leaflet/dist/leaflet.css" type="text/css" media="screen" />` to the `<head>` of `index.html`
3. `import * as L from 'leaflet';` at the top of `main.ts`

Then you can use Leaflet normally within TypeScript.

## The Quick & Dirty Way
If you want to load something quick smart, find the CDN URLs from https://cdnjs.com/ and put them in the `<head>` of `index.html`. You can refer to the global variables that the libraries expose within TypeScript (e.g. `main.ts`) but your editor may complain, since there are no types defined.

For example, if you wanted to quickly import [Leaflet](https://leafletjs.com/examples/quick-start/), you'll need to use the global `L` interact with Leaflet. TypeScript doesn't know about `L`, so you'll need to tell it to ignore `L` by adding a line near the top of your TypeScript file:

``` typescript
declare const L: any;
```

The downside of this approach is that `L` and all its methods and classes will be typeless, so you're on your own.

# Building

WaterBox is 🚨not designed for production use🚨 but it can be built to be served statically, if you must. Just `npm run build` and grab the output from the `./dist/` folder and host wherever you like.
