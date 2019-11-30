# Broadcaster
[![Build Status](https://travis-ci.org/shaazk/Broadcaster.svg?branch=develop)](https://travis-ci.org/shaazk/Broadcaster) [![Maintainability](https://api.codeclimate.com/v1/badges/31f7a555c0c36d16a57e/maintainability)](https://codeclimate.com/github/shaazk/Broadcaster/maintainability) [![Coverage Status](https://coveralls.io/repos/github/shaazk/Broadcaster/badge.svg?branch=develop)](https://coveralls.io/github/shaazk/Broadcaster?branch=develop)

A simple backend for Broadcaster
> Simple but powerfully made .
> Evaluation Criteria:
The system must have:
- Home page
- Login
- Sign up
- About red-flag and intervention
- News
User Dashboard
- Profile Page
- Support for different user levels such as admin and citizen page

As for the backend, the language used is nodejs.
#### Frontend tools
- HTML
- CSS
- Javascript

### Broadcaster Available endpoints
|     URL     |     HTTP Methods     |     Description     |
| ----------- | -------------------- | ------------------- |
|api/v1/auth/signup | POST | Create user account |
|api/v1/auth/signin |POST  | Login a user |
|api/v1/incident|POST| Create an incident(redflag/ intervention)|
|api/v1/incident/<:incident-id>/comment|PATCH|Update an incident comment(red-flag/intervention)|
|api/v1/incident/<:incident-id>/location|PATCH|Update a specific incident location(red-flag/intervention)|
|/api/v1/incident/<:incident-id>|DELETE|Delete an incident(red-flag/intervention)|
|api/v1/red-flags|GET|Get all Redflags|
|/api/v1/red-flags/<:incident-id>|GET|View a specific Redflag|
|api/v1/interventions|GET|Get all interventions|
|/api/v1/interventions/<:incident-id>|GET|View a specific intervention|

# Installation and Environment Setup

**Clone the repository from [Github](https://github.com/shaazk/Broadcaster.git)**

( You will need **Git** for this if you are running a Windows PC, Get it [HERE](https://git-scm.com/) )

```
git clone https://github.com/shaazk/Broadcaster.git
```

**To Install all dependencies:**

```
npm install
```
**To run the tests:**

```
npm test
```

**Now to start the app:**

```
npm start
``` 
**To start the app in development mode:**

```
npm run dev
```
### Backend Tools used
 - Server side Framework: [Node/Express](https://expressjs.com/)
 - Linting Library: [ESLint](https://eslint.org/)
 - Style Guide: [Airbnb](https://github.com/airbnb/javascript)
 - Testing Framework: [Mocha](https://mochajs.org/)

#### Host online
 - Github pages [here](https://shaazk.github.io/Broadcaster/UI/)
 - Heroku [here](https://broadcaster01.herokuapp.com/)
 - Pivot Tracker story [here](https://www.pivotaltracker.com/n/projects/2410905)


## Getting started with Application
### Prequesite for project
- Text Editor [Microsoft Visual studio code](https://code.visualstudio.com/)
- Nodejs [environment](https://nodejs.org/en/)
- Postman API [development](https://www.getpostman.com/)
- Github bash [terminal](https://git-scm.com/downloads) 

### Installation
- visit the repository on [github](https://github.com/shaazk/Broadcaster)
- clone the repository in terminal
- `cd Broadcaster`  to navigate inside repository

### Start Application
update packages by installing dependencies
 >npm install or npm i

start local server of application on `PORT 4000`
>npm run dev

### API URL
Now, to run your app locally and access resources, we will have to use the  endpoint URL below as an illustration.
` Example http://localhost:4000/api/v1/auth/signup `
> http://localhost:4000/api/v1/

### Test App
The app is designed with Test Driven Development(TDD). To see how it works, run the command below in your terminal.
>npm test

### API Documentation
- visit postman API [here](https://documenter.getpostman.com/view/8526171/SW7aYnoD)

### Feedback
- Any found issue, raise it on [github](https://github.com/shaazk/Broadcaster/issues)

### Version
- The Broadcaster is `v1.0`

### License
- issued by **Mutesi Sharon Kiiza**
- free open source## Getting Started
