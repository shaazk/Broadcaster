[![Build Status](https://travis-ci.org/shaazk/Broadcaster.svg?branch=develop)](https://travis-ci.org/shaazk/Broadcaster)


# Broadcaster
Corruption is a huge bane to Africa’s development. African countries must develop novel and localized solutions that will curb this menace, hence the birth of Broadcaster. Broadcaster enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that need government intervention

### User Interface information

#### Frontend links

Home page
>[https://shaazk.github.io/Broadcaster/UI/](https://shaazk.github.io/Broadcaster/UI/)


Sign up page
>[https://shaazk.github.io/Broadcaster/UI/pages/signup.html](https://shaazk.github.io/Broadcaster/UI/pages/signup.html)


Sign in page
>[https://shaazk.github.io/Broadcaster/UI/pages/signin.html](https://shaazk.github.io/Broadcaster/UI/pages/signin.html)


Admin page
>[https://shaazk.github.io/Broadcaster/UI/pages/adminPanel.html](https://shaazk.github.io/Broadcaster/UI/pages/adminPanel.html)


User page
>[https://shaazk.github.io/Broadcaster/UI/pages/userAccount.html](https://shaazk.github.io/Broadcaster/UI/pages/userAccount.html)


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
Broadcaster is a public repository, you can clone it anywhere on your local machines to get started. I would highly recommend using vscode as your IDE. It will help you run the html pages on live server and i would also recommend you go feature by feature for learning purposes. If you encouter any problems(bugs and vulnerbities) with the application, feel free to inform me.

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
- visit Swagger API [here](https://way-farer-challenge.herokuapp.com/docs/)

### Feedback
- Any found issue, raise it on [github](https://github.com/shaazk/Broadcaster/issues)

### Version
- The Broadcaster is `v1.0`

### License
- issued by **Mutesi Sharon Kiiza**
- free open source