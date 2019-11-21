# Introduction
This repository has a few intentions surrounding it. The first and foremost is to act as my first attempt at deploying using GitHub pages as I feel this is a very cool feature I was just made aware with GitHub.

The second is of course, to create a ReactJS app with all concepts and features I am aware of while doing something fun by consuming a free public API surrounding one of my favorite TV shows currently, Rick and Morty.

I want to thank [GitHub Public APIs](https://github.com/public-apis/public-apis#games--comics) for showing me the location of the [actual API I will be using](https://rickandmortyapi.com/).

While source control was done in GitHib, I primarily coded and used GitHub in Visual Studio Code as that is currently the IDE I am most comfortable using.

## History
I used [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) to get this started after getting this repository set up. First thing was to run the following commands:

```
npx create-react-app rick-and-morty
```

`create-react-app` Puts a lot of pre compiled files in there including a lot of CSS which I don't care for. Since I am usually about controlling all of the HTML and CSS styles that are output, I scrapped those and just put in an empty shell for now while I begin creating the app.

Afterwards, I proceeded to make some changes to some files in order to help prepare for the GitHub deployment. I added into the `package.json` file the following:

```
"homepage":"https://bkatchmar.github.io/rick-and-morty-api-consumption",
```

This is the URL in GitHub I intend to store this.

Next, I install `gh-pages` by running:

```
npm install --save gh-pages
```

and back in `package.json` I add

```
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

to the `scripts` setting.

This largely means once I open a git shell and run `npm run deploy` I can push to the Git pages URL at any time. Real cool stuff!

# NPM Libraries Used
To help me with building this application, naturally, I used a variety of packages that I install via npm.

```
npm install --save bootstrap
npm install --save reactstrap react react-dom
npm install --save react-router-dom
npm install --save axios
npm install --save-dev enzyme enzyme-adapter-react-16
```

## reactstrap
This is basically Bootstrap with React Components to make using Bootstrap even easier, perfect for getting a base style structure out of the way. [More Info](https://reactstrap.github.io/).

## axios
We use this to make our API calls.

## enzyme and enzyme-adapter-react-16
DEV ONLY: Used for unit testing in a react environment.

# Concepts Covered in this Repo
The main purpose of this repository is to cover as many concepts as I can regarding ReactJS to show my aptitude for the technology.

* Routing
* Using `npm` packages for additional, out-of-the-box functions
* Calling an API and using promises to update the UI
* Using variables based on if the environment is development or production
* Using Jest and Enzyme for a test driven development environment

# Files In This Repo
All files come with a `.test.js` version as development continues, we also write unit tests for almost everything we write for. I have an `npm start` running in one terminal and an `npm run tests` in another.

## App.js
Main entry point for this app, includes routing objects

## Dashboard.js
Main Dashboard or default route target

## Character.js
Table view of all Rick and Morty characters

## IndividualCharacter.js
View for an individual character, using react card

## api_call/UrlEndPointGenerator.js
Used to generate the URL endpoints that we call in a way that makes the code look a little more presentable (at least I think so)