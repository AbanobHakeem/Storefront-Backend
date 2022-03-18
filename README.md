# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing


## Steps to use the app


### 2. how to setup and connect to the database

Creat a donenv file and add the folloung
POSTGRES_HOST=YOurHost
POSTGRES_DB=store_dev
POSTGRES_USER=user
POSTGRES_PASSWORD=Pass

POSTGRES_DB_TEST=store_test
POSTGRES_USER_TEST=store_test
POSTGRES_PASSWORD_TEST=123456

ENV=dev

BCRYPT_PASSWORD=Encript Key
SALT_ROUNDS=NUMBER_OF_ENCRIPT_ROUNDS

TOKEN_SECRET=TOKEN kEY

to strat the project in develpmet mode run : npm run start

to strat the project in production mode run : npm run build && node build/index

if you want to run the testing cases run : npm run test

### 2. what ports the backend and database are running on
the port is 300 but you can change if from index.ts

### 3. package installation instructions
 install the porject is upoloded with the packages however is any is not please check th package.json file

