# MyFlixCL Angular!

This project is an alterative implementation of the client side of the movie-app built with Angular. It uses the existing server-side code (REST API and database), with supporting documentation

## Live Demo

[View App](https://cluelesslinh.github.io/myFlix-Angular-client/welcome)

## Tech Stack

- Mongo DB
- Express
- Angular + Angular Material
- Node

## User Stories

- As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Key Features

- The app displays a welcome view where users will be able to either log in or register an account
- Once authenticated, the user should now view all movies
- Upon clicking on a particular movie, users will be taken to a single movie view, where additional movie details will be displayed.
- The single movie contains the following features: a button that when clicked shows a dialog containing details about the director; a button that when clicked shows a dialog containing details about the genre; a button that when clicked shows a dialog containing the synopsis of the movie; a button (heart shaped) that lets the user add the movie to their list of favorites movies.
- The user should also be able to access their profile view with the options of editing it or delete it.

## Installation

- Run `npm install` to install all the dependencies
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
