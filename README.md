# Basic user auth application

## Link to deployed App

**[Production Deployment Backend](https://cake-user-backend.herokuapp.com/)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/6225879/SWTBeHoV)

## Installation

## Backend

- Clone the repo by clicking the green clone or download button to copy the url on github
- In your teminal, run `git clone [insert URL copied from first step]`
- Open the repository with your code editor
- Checkout the `develop` branch using `git checkout develop`
- Setup `.env => checkout sample (.env.example) in the codebase` for environment variable
- Run `npm install` to install all dependencies
- Type `npm run watch` to get the development server running on the front-end

### Authentication

## Signup

`POST https://cake-user-backend.herokuapp.com/api/v1/signup`

```js
  {
    "firstName": "",
    "lastName": "",
    "password": "",
    "email": "",
    "avatar": "",
    "phoneNumber": "",
    "address": "",
    "dateOfBirth": "",
    "securityQuestions": [
        {
            "question": "",
            "answer": ""
        },
        {
            "question": "",
            "answer": ""
        },
        {
            "question": "",
            "answer": ""
        }
    ]
}
```

`POST https://cake-user-backend.herokuapp.com/api/v1/login`

## Login

```js
{
	"email": "",
	"password": ""
}
```

`POST https://cake-user-backend.herokuapp.com/api/v1/profile`

## Login

```js
{
    "firstName": "",
    "lastName": "",
    "email": "",
    "avatar": "",
    "phoneNumber": "",
    "address": "",
    "dateOfBirth": ""
}
```

`GET https://cake-user-backend.herokuapp.com/api/v1/logout`

## Login

```js
{
    "firstName": "",
    "lastName": "",
    "email": "",
    "avatar": "",
    "phoneNumber": "",
    "address": "",
    "dateOfBirth": ""
}
```

## Contributing

- To contribute to this repo, branch off `develop` to create your own branch
- branch names can be `feat-create-login-page`
- Push your code to github and make a pull request against `develop`

## Required features

- Users can **Sign up for an account**
- Users can **login**
- Users can **view their profile**
- Users can **Update their profile**
- Users can **log out**

## Technologies

- ExpressJS
- React
- Redux
- styled-components
