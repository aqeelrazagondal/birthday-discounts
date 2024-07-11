## Description

Birthday Reminder is a simple application that allows users to register and login to create, update, and delete birthday reminders. The application is built with [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

### Technologies implemented:

-   [sequelize-typescript](https://github.com/RobinBuschmann/sequelize-typescript) (ORM) + [MySQL](https://www.mysql.com/)
-   [JWT](https://jwt.io/)
-   [Swagger](https://swagger.io/)

## Prerequisites

-   [Node.js](https://nodejs.org/) (>= 10.8.0)
-   [npm](https://www.npmjs.com/) (>= 6.5.0)

## Installation

```bash
$ npm install
```
## Configuration
create and setup environment variables in .env file
    
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-email-password
    EMAIL_FROM=
        
    APPLICATION_REDIRECT_URL=https://your-app-link.com
        
    DATABASE_HOST=localhost
    DATABASE_PORT=3306
    DATABASE_USER=admin
    DATABASE_PASSWORD=admin
    DATABASE_NAME=test
        
    JWT_PRIVATE_KEY=your-private-key
    JWT_PUBLIC_KEY=your-public-key
    JWT_EXPIRES_IN=1h
        
    TTL=3600
    LIMIT=10
        
    SENDGRID_API_KEY=your-sendgrid-api-key
        
    PORT=3000


## Setting up the database for development and test

MySQL database connection options are shown in the following table:

| Option   | Development | Test      |
| -------- |-------------| --------- |
| Host     | localhost   | localhost |
| Port     | 3306        | 3306      |
| Username | admin       | admin  |
| Password | admin       | admin  |
| Database | example     | example |

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger API docs

This project uses the Nest swagger module for API documentation. Swagger docs will be available at localhost:3000/api
