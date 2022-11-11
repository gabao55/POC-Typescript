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