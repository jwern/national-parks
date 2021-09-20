# README

# National Parks Page

This is a single-page website that utilizes the [National Park Service (NPS) API](https://www.nps.gov/subjects/developer/api-documentation.htm) to fetch information about parks in a chosen state. The current version will only return the first 12 parks from a selected state (if a state has fewer than 12 parks listed in the NPS database, then all parks will be fetched).

This project was built as a challenge over a two-day span.

## Functionality

The page was built to spec according to the assignment requirements, which requested specific layout and content features. The park data that is displayed from each park includes its name, description, GPS coordinates, first three visitor activities, the link to the park on the NPS website, and the first image of the park returned by NPS.

The additional functionality that has been added beyond the required elements includes an animated (on hover) logo in the header; a state selection input to view parks in states other than California; a set of backup data in case the API is unavailable; and the majority of style decisions beyond the basic page layout, including button links and social icons.

If I were to revisit this project in the future, these are some of the additional features I would consider adding:

- [ ] Option to view more (or fewer) than 12 parks at a time
- [ ] Option to sort park list
- [ ] Other park search options, like 'view a random park' or 'view park nearest to me' based on location
- [x] Randomized image selection from the API...
- [ ] ...and/or carousel of images of the park within its card
- [x] Hero image that updates to match the chosen state...
- [ ] ...and/or hero image that is an auto-scrolling carousel of park images
- [ ] Ability to expand / read more of the truncated description text
- [ ] More accessibility features
- [ ] Jump / anchor buttons for moving between cards on smaller viewports

## Screenshots

### Desktop

![Desktop view screenshot](/screenshots/national_parks_desktop.jpg)

### Mobile

![Mobile view screenshot](/screenshots/national_parks_mobile.jpg)

## Getting Started

If you'd like to edit this project, clone this repo to your local directory.

In the root of the cloned repo, run:

```
$ npm install
```

All of the dependencies used in this project are related to [webpack](https://github.com/webpack/webpack) and appear in the webpack config files contained within.

Two webpack environments are included, and their scripts are defined in [package.json](package.json):

To run a **development** environment, run:

```
$ npm start
```

The `dev-server` should open a browser window automatically and live reload when you save any edited files.

To build a **production** bundle, run:

```
$ npm run build
```

This will output your bundles to the `dist/` directory (it will create `dist/` if it doesn't exist yet). After running `npm run build`, in the `dist/` folder you should see:

- all files from [src/images](src/images) copied over to the `dist/assets` directory with hashed filenames
- a single index.html file
- a single main."hash".bundle.js file
- a single style."hash".css file

This is the folder you should use when pushing your site live.

### Accessing the API

To access the NPS API, you'll need an API key. You can get one for free at the [NPS developer resources page](https://www.nps.gov/subjects/developer/get-started.htm).

In the [src/js](src/js) folder, you should see a file named [secretSample.js](src/js/secretSample.js). It looks like this:

```
const nationalParksKey = "YOUR_KEY_HERE";

export default nationalParksKey;
```

In this file, where you see "YOUR_KEY_HERE", paste the key you get from the NPS website (inside the quotes so it is a string). Then, rename the file to just `secret.js`: this is the filename [fetchData.js](src/js/fetchData.js) calls to access the API key (visible in line 1 of [fetchData.js](src/js/fetchData.js)).

You can freely change the filename or variable name from [secretSample.js](src/js/secretSample.js), but you should mirror those changes in [fetchData.js](src/js/fetchData.js).

## Technologies / Credits

This national parks page was built with JavaScript and SCSS. It uses [webpack 5](https://webpack.js.org/), including [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin), [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin), and more (see [package.json](package.json) for the full list of dependencies).

The color scheme was designed with the help of [Colormind](http://colormind.io/) and [Coolors](https://coolors.co/). The header "logo" and footer social media icons are from [Ionicons](https://ionic.io/ionicons).

The hero image is a photo of Muir Woods by [Corey Agopian on Unsplash](https://unsplash.com/photos/XGOzlCNeP1I). The header / footer texture overlay is from [Transparent Textures](https://www.transparenttextures.com/).

The body font is [Roboto](https://fonts.google.com/specimen/Roboto) and headings font is [Didact Gothic](https://fonts.google.com/specimen/Didact+Gothic), both from [Google Fonts](https://fonts.google.com/).

All national parks data comes from the [NPS API](https://www.nps.gov/subjects/developer/api-documentation.htm). The legal and social links direct to [NPS](https://www.nps.gov/)-specific pages.
