# 🌊 WaterBox

WaterBox is a low-code boilerplate base for rapid prototyping and interactive demos using [TypeScript](https://www.typescriptlang.org/), [SQLite](https://www.sqlite.org/) (with [sql.js](https://sql.js.org/)) and [Mustache](https://github.com/janl/mustache.js) templating, **all run within the browser with no server required**.

It's all glued together using [Parcel](https://parceljs.org/) and has some nice semantic default styling from [Water.css](https://github.com/kognise/water.css) along with convenient access to all of [Tailwind CSS](https://tailwindcss.com/)'s utility classes for styling things *fast*. 

Need something graphical to convey your message? WaterBox even comes with [remixicon](https://remixicon.com/) so you can easily use one of 2000+ icons instantly in your markup.

**See an example app with in-browser SQL querying [here](https://brave-panini-a4cca2.netlify.app/)**.

## Why?

Sometimes you just need to whip something up to demonstrate a proof-of-concept or illustrate something interactively to get the point across, but traditional app development stacks can be too heavy handed. Often you face a steep learning curve to even get started with the basics.

WaterBox is built on a foundation of time-tested technologies that most developers would already be familiar with, or at least would find it easy to pick up:

- JavaScript (TypeScript is for added safety, and can be ignored)
- SQL (in the form of SQLite and sql.js)
- Mustache templating

With very little code (you could read it all in under an hour) WaterBox ties it all together into a simple `npm start` with live-reloading to let you get on with preparing that important demo. You won't have to worry about TypeScript compilation, running a web server, etc.

And Water.css gives you free *classless* styling as long as you write proper HTML. For more advanced styling, Tailwind CSS gives you thousands of utility classes that you can write directly in to your HTML. You only have to write plain CSS for the UI that you *really* want to deeply customize.

There is no right or wrong way to do something with WaterBox. Keep what you need, delete what you don't, and change the rest to your liking.

**If you're wanting to build a production-ready web app, you shouldn't be using WaterBox**. The sql.js way of fetching data isn't meant to be fast and it doesn't support persisting any data back to the database for future sessions.

## Requirements

You'll need Node (>v12.19.0) installed before you can follow the Quick Start below. See the instructions at https://nodejs.org/.

## Quick Start

After cloning this repo, cd into the root of the repo and run `npm install` to install all dependencies, then run `npm start` to build and start the server, and visit http://localhost:4321 in your browser to see it.

Edit the data in `./static/db.sqlite` (I recommend using [DB Browser for SQLite](https://sqlitebrowser.org/)) to see the HTML table change.

Edit the template in `./templates/main.mustache` to add things to the page.

See a more advanced template in `./templates/tailwind-grid.mustache`.

Have a look at `./src/main.ts` to see the `main()` method, written in TypeScript, that fetches the data from SQLite and renders it onto the page. You can replace this with whatever you like.

Bring up Developer Tools in your browser using <kbd>F12</kbd> and check out the console for log messages on templating and SQL querying. This will help you get started customizing those things.

## Don't Need Mustache?

You don't have to use it. Just ignore the templates and remove any `renderContainer` calls from `main.ts`. You can hand craft your markup in `index.html` or construct it all entirely within TypeScript/JavaScript.

## How to Load External Libraries

If you need another library, the best way is to find the package on https://www.npmjs.com/ and `import` the package properly in TypeScript. You might also have to install a corresponding `@types` package to get TypeScript more happy with your import. This works well, but takes a long time.

For example, to load [Leaflet](https://leafletjs.com/examples/quick-start/) properly, with all typings:

1. `npm install --save-dev leaflet @types/leaflet`
2. Add `<link rel="stylesheet" href="node_modules/leaflet/dist/leaflet.css" type="text/css" media="screen" />` to the `<head>` of `index.html`
3. `import * as L from 'leaflet';` at the top of `main.ts`

Then you can use Leaflet normally within TypeScript.

### The Quick & Dirty Way
If you want to load something really quickly, find the CDN URLs from https://cdnjs.com/ and put them in the `<head>` of `index.html`. You can refer to the global variables that the libraries expose within TypeScript (e.g. `main.ts`) but your editor may complain, since there are no types defined.

For example, if you wanted to quickly import [Leaflet](https://leafletjs.com/examples/quick-start/), you'll need to use the global `L` interact with Leaflet. TypeScript doesn't know about `L`, so you'll need to tell it to ignore `L` by adding a line near the top of your TypeScript file:

``` typescript
declare const L: any;
```

The downside of this approach is that `L` and all its methods and classes will be typeless, so you're on your own.

## Theming
WaterBox is set up with Water.css's automatic light/dark theme switching based on the user's system preferences. Follow the instructions in `./styles/theme.css` for how to force light or dark themes all the time.

You can also adjust the variables in `theme.css` to adjust the overall colors. You have the choice of mapping them to different colors with Tailwind's color palette (defined in `./colors.js`) using `theme(colors...)` or defining them manually by hand. 

You can also redefine colors directly in `colors.js` so that your colors will be accessible through Tailwind's utility classes too. Use one of the many color palette generators online to help you with this.

## Building

WaterBox is **not meant for production** but it can be built to be served statically from any plain web server (no nodejs or application server required). Just `npm run build` and grab the output from the `./dist/` folder and host wherever you like.

## Troubleshooting

### CLI: Cannot read property 'type' of undefined (after making a change)

If you're using a JetBrains IDE, try going to *Settings > Appearance & Behavior > System Settings* and **unticking** "Use 'safe write'" in the *Synchronization* section.

### Browser Console: Cannot read property 'apply' of undefined (on startup)

There might be cached files in `dist` and `.cache` that are messing with the build. You can delete the two folders manually, or use `npm run clean` to do it for you. After that, the next `npm start` should work.

### How do you get a full-width layout?
Water.css lets you create a good-looking document without writing any CSS at all. As part of its job, it centers the document and limits the horizontal width of `<body>` to improve readability. 

To override this easily, add the following CSS somewhere on the page, either in an individual mustache template, in `index.html`, or in `main.css`:

``` css
body {
  padding: 0;
  margin: 0;
  max-width: 100%;
}
```

