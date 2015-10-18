# EncompassStartup Career Compensation Calculator

###When setting up local environment, do the following:
1. npm install in root folder
2. npm install in client folder
3. npm install -g babel
4. run the server (nodemon server/server.js)
5. run the following command from the client dir: babel --watch src/ --out-dir public/

###Setting up the database:

1. Install PostgreSQL, and create a database named 'encompass'
2. Set variable 'resetDB' in server/models/db.js to true. This will wipe the database, and rebuild the tables.
3. Set variable 'seedDB' in server/models/db.js to true. This will add the seed data from seedData.json
4. Run server.js as usual. 1 and 2 will happen at server start.
5. Be sure to set the two variables back to false, otherwise 1 and 2 will happen everytime server is started
