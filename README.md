#Encompass
#Startup Career Compensation Calculator
A tool that helps all tech employees make better, more informed hiring decisions

###When setting up local environment, do the following:
1. `npm install` in root folder
2. `npm install` in client folder
3. type `grunt server-dev` (cd into client folder)
  * this will transpile the JSX upon any change

###Setting up the database:
1. Install PostgreSQL, and create a database named 'encompass' 
  * (from terminal) `psql template1`
  * (in PostgreSQL) `CREATE DATABASE encompass;`
  * (in PostgreSQL) Press `ctrl+D` to exit
2. `npm run dbreset` to drop the database and rebuild the tables.
3. `npm run seed` to seed the database. This takes a while.

###Setting Redis data store:
1. Install redis `brew install redis`
2. Start redis server `redis-server`

###Starting the app:
1. cd into the server directory
2. type `npm start`

