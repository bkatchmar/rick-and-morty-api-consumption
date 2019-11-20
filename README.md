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