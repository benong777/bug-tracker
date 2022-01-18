Bug Tracker system for developers to collaborate on projects.

This Full Stack application was built using:
1) Angular for the front-end
2) Node.JS, Express and MySQL for the back-end
3) REST API was created using NodeJS
4) JSON Web Token (JWT) was used for user authorization.

To run the frontend:
a) npm install
b) ng s

To run the backend:
a) node app.js

MySQL Database tables:
a) User - id, first name, last name, email, password
b) Product - id, product name, description, idBrand, idCategory
c) Category - id, category name
d) Brand - id, brand name
e) Favorite - id, idUser, idProduct, notes


# BugTracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
