
Developed and built on MacOS 10.13 with Postgres 12.2 DB

DB Setup

To populate the database and setup access, I wrote a Postgres initialization script. The script needs to be run as a superuser because it creates the user used in the API and grants them access to the DB.
(I also removed the blank line from line two of the csv).

To run the command below enter the server directory and ensure that the path to the csv is updated in the init.sql and insure that a database exists in your Postgres environment

psql -U (your_username) -d (your_database_name) -a -f init.sql

Backend Setup

The backend was built with Node with the following dependencies:
    cors
    pg
    express

To initialize and run Express server after populating the db, enter the server directory and run the below commands:

npm install
npm run start

Frontend Setup

The backend was built with React and styled with Material UI, it also uses axios to fetch data from the Express API;

To initial the React front end, enter the client directory and run the below commands:

npm install
npm run start