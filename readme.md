#### CRUD TEST:

##### FRONTEND:

###### To run the app :

- clone the repo
- go the folder/client
- npm install
- npm run dev // this will start app in developement

##### BACKEND:

###### To run the app :

- go the folder/api
- npm install
- create a .env file and include

```env
MONGO_URI = mongodb://localhost:27017/crudTest

SECRET_KEY = mysecretkey
```

- nodemon start // this will start backend server

##### Key Points:

- on running the app you will redirect to login page
- so click on go to register
- now add new users
- then again to go login and authenticate
- this will redirect you to home i.e. "/"

**Note**:

- Only admin or autheticated user can delete or update user info

##### Features:

- CRUD operation
- jwt authentication
- search
- sort
- pagination
- model validation (backend)
- frontend validation
