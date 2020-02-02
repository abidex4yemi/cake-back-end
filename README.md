# Basic user auth/landing page application

## Link to deployed App

**[Production Deployment Backend](https://cake-user-backend.herokuapp.com/)**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/6225879/SWTBeHoV)

## Installation

## Backend

- Clone the repo by clicking the green clone or download button to copy the url on github
- In your teminal, run `git clone [insert URL copied from first step]`
- Open the repository with your code editor
  `develop` is the default branch and contains all full the code`
- Setup `.env => checkout sample (.env.example) in the codebase` for environment variable
- Here's an example of `MONGO_URI` on Atlas i used for easy app set up
- `mongodb+srv://<username>:<password>@cluster-585-ex-ex.mongodb.net/test?retryWrites=true&w=majority`
- Run `npm install` to install all dependencies
- Type `npm run watch` to get the development server running

### Authentication

## Sign up

`POST http://localhost:2020/api/v1/signup`

## Sign up Request body example

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

## Sign up

`PUT http://localhost:2020/api/v1/profile`

## Update profile Request body example

```js
  {
    "firstName": "",
    "lastName": "",
    "email": "",
    "avatar": "",
    "phoneNumber": "",
    "address": "",
    "dateOfBirth": "",
}
```

## Login

`POST http://localhost:2020/api/v1/login`

## Login Request body example

```js
{
	"email": "",
	"password": ""
}
```

## Note query params of `email` is required

`GET http://localhost:2020/api/v1/users/security-questions?email=example.com`

## Get user security questions

## Response example

```js
{
    "success": true,
    "message": "Security questions three(3)",
    "body": {
        "securityQuestions": [
            {
                "question": "What is your oldest sibling’s middle name?",
                "_id": "5e3586b7dd007a003a923572"
            },
            {
                "question": "What is your car’s license plate number?",
                "_id": "5e358cb7dd008a003a943573"
            },
            {
                "question": "What was your first car’s make and model?",
                "_id": "5e358c67dd027a003a943574"
            }
        ]
    }
}
```

`PUT http://localhost:2020/api/v1/user/reset-password`

## Reset-password

```js
{
    "newPassword": "",
    "email": "",
    "securityAnswers": [
            {
                "question": "put in returned question from security questions above",
                "answer": "put in user answer",
                "id": "put question id"
            },
            {
                "question": "put in returned question from security questions above",
                "answer": "put in user answer",
                "id": "put question id"
            },
            {
                "question": "put in returned question from security questions above",
                "answer": "put in user answer",
                "id": "put question id"
            }
        ]
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
- Users can **reset their password**
- Users can **log out**

## Technologies

- ExpressJS
- React
- Redux
