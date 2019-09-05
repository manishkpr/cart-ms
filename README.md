
# Cart Micro Service


## Requirement

 1. Node.JS Version 10.3.0 onwards
 2. Postgres 9.6 onwards
  

## Setup

For database setup, you have two options..

- Through Docker (recommended)

- Install Docker and run the **docker-compose up** command in the terminal at the project root directory (which will target the `docker-compose.yml` file).

- Assuming you did not change anything in the `.env` file, the postgres created will be compatible with it or you can copy env file from env directory

- Manual setup

- Install and setup your own PostgresDB (9.6 or newer)

- Create the database, user, user-password as per the `.env` file in the project root directory and check that it is listening to the right port.


With the database setup out of the way, things are simpler now with the following steps.

- Run **npm install**

- Run the seed command from `package.json` - **npm run seed** (this will create the tables and seed some sample data needed for the test)

- Finally run **npm run start** to run the service.

If everything is setup and running properly, you can now curl (http://localhost:6482/) and get a 200 Ok response.

  
 