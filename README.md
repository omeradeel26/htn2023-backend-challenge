# htn2023-backend-challenge
 
Description
This project is a backend API designed to store user hackathon information in a database for later retrieval. The ultimate goal is for this project to communicate with a frontend UI, allowing hackers to access a variety of information such as their skill comparison among other hackers. The backend stores important information about the hacker and their respective submissions, such as name, email, and company.

Technologies
This project was created using Node.js as the backend framework, with Express.js used to create the REST API. The ORM used to communicate with the RDBMS is Sqlite.

Installation/Usage Instructions
Fork the repository.
Install all required dependencies, such as Node, Express, and Sqlite.
Run 'node init_database' to initialize the database.
Run 'node index' to turn on server
Use an API testing service to test different API routes.
Enjoy!

API Routes
(GET) /users/all: Get all user information.
(GET) /users/:id: Input any positive integer ID number between 1-1000 to obtain information about a given user.
(PUT) /users/update/{query}: Update any user's information given any of their information as input, such as name or email.
(GET) /skills/frequencies: Get all frequencies of each registered skill in the database.
(GET) /skills/frequencyFilter{query}: Get all frequencies of skills between a minimum and maximum frequency. (maxFreq and minFreq)

Project Structure
node_modules: NPM installed modules (managed with package-lock/package.json).
init_database.js: A script used to initialize both the skills and users tables.
index.js: Manages all Express server, middleware, and routing setup.
.env: Holds private variables.
routes:
    skills.js: Manages all GET routes related to skills data, including skills frequencies.
    users.js: Manages all GET/PUT routes for all or individual user information.
database:
    skills.db: Holds all skills with associated scores for each individual. Each column is a documented skill, and each row is a user with their column representing their corresponding rating for the skill.
    users.db: Holds all user information. Columns contain user information, including first name, last name, company, email, and phone number. Skills are held within the skills.db table, with each row ID corresponding to the users.db user ID.


Overall, this project is a well-designed backend API that can effectively store and retrieve user hackathon information. Its use of Node.js and Sqlite makes it highly efficient and easily scalable, and its well-organized project structure ensures that it can be easily maintained and updated in the future.