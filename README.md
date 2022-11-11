<h1 align="center">POC - Typescript</h1>

This is just a POC for Typescript first trial, so it is not deployed. This API is supposed to simulate a to do app server, that allows different end users to insert tasks, check or uncheck them as done, delete them and check either all tasks or someone's tasks.

## Technologies

This project was developed using Node.js along with express and Typescript and PostgreSQL for database

## Requisites

This app requires Node.js and PostgreSQL to work properly (besides the packages and libs installed and listed in the package.json file)

## Setting up

In order to set up the app to run it locally, follow these steps:

1. Clone the repository
2. Install all dependencies 

```bash
npm i
```

3. Create a .env file and fill information based in the .env.example file (you can use localhost for the POSTGRES_HOST)
4. Create a database in Postgres connection
5. Populate the database by running the commands within dump.sql file

## Run locally

In order to run it locally, run:

```bash
npm run dev
```

# Routes

## List all tasks

### Request

`GET /tasks/`

### Response

    HTTP/1.1 200 OK
    Status: 200 OK

    data: [
        {
            "id": 1,
            "name": "wash dishes",
            "description": "wash all dishes",
            "deadline": "20/11/2022",
            "responsible_id": 1,
            "responsible": "Gabriel",
            "done": false
        },
        {
            "id": 2,
            "name": "Play cards",
            "description": "play cards with friends",
            "deadline": "tomorrow",
            "responsible_id": 3,
            "responsible": "Lucas",
            "done": false
        }
    ]

## List all responsible's tasks

### Request

`GET /tasks/:responsibleId`

### Response

    HTTP/1.1 200 OK
    Status: 200 OK

    data: [
        {
            "id": 1,
            "name": "wash dishes",
            "description": "wash all dishes",
            "deadline": "20/11/2022",
            "responsible_id": 1,
            "responsible": "Gabriel",
            "done": false
        },
        {
            "id": 2,
            "name": "Play cards",
            "description": "play cards with friends",
            "deadline": "tomorrow",
            "responsible_id": 1,
            "responsible": "Gabriel",
            "done": false
        }
    ]

## Insert a task with the corresponding responsible 

### Request

`POST /tasks/`

    Body: 
        {
            "name": "Play cards",
            "description": "play cards with friends",
            "deadline": "2022/11/20"
        }
    Header (the Authentication header will be the username+123, can be gabriel, lucas or pedro): 
        {
            "Authentication": "Bearer gabriel123"
        }

### Response

    HTTP/1.1 201 CREATED
    Status: 201 CREATED

    data: "Task inserted with id 4"

## Check and uncheck a task that belongs to a user as done/not done

### Request

`PATCH /tasks/:taskId`

    Header (the Authentication header will be the username+123, can be gabriel, lucas or pedro): 
        {
            "Authentication": "Bearer gabriel123"
        }

### Response

    HTTP/1.1 202 ACCEPTED
    Status: 202 ACCEPTED


## Delete a task that belongs to a user

### Request

`DELETE /tasks/:taskId`

    Header (the Authentication header will be the username+123, can be gabriel, lucas or pedro): 
        {
            "Authentication": "Bearer gabriel123"
        }

### Response

    HTTP/1.1 204 NO CONTENT
    Status: 204 NO CONTENT
