# htn2023-backend-challenge
 
**Description:**  
This project is a backend API designed to store user hackathon information in a database for later retrieval. The ultimate goal is for this project to communicate with a frontend UI, allowing hackers to access a variety of information such as their skill comparison among other hackers. The backend stores important information about the hacker and their respective submissions, such as name, email, and company.

**Technologies:**  
This project was created using Node.js as the backend framework, with Express.js used to create the REST API. The ORM used to communicate with the RDBMS is Sqlite.

**Installation/Usage Instructions:**  
Fork the repository.  
Install all required dependencies, such as Node, Express, and Sqlite.  
Run 'node init_database' to initialize the database.  
Run 'node index' to turn on server  
Use an API testing service to test different API routes.  
Enjoy!  

**API Routes:**  
(GET) /users/all: Get all user information. {skills: [{skill, rating}], phone, first_name, last_name, email, phone}  
(GET) /users/:id: Input any positive integer ID number between 1-1000 to obtain information about a given user. *object returned as above  
(PUT) /users/update Update any user's information given any of their information as input, such as name or email. Data included in request body as user object above  
(GET) /skills/frequencies: Get all frequencies of each registered skill in the database.  
(GET) /skills/frequencyFilter{query}: Get all frequencies of skills between a minimum and maximum frequency. queries:'minFreq' and 'maxFreq'  
(POST) /registration/enroll: Enroll new user into system. Include user properties in request body as {name: '', email: '', phone; '', company: ''}  
(DELETE) /registration/unenroll: Delete user from system. Include user id as request query propery  
(GET) /scan/:id : Get all of the events that a user is enrolled in and return as object.  
(PUT) /scan/event: Add new event to user database upon scanning. Include user id as request query property

**Project Structure:** 
node_modules: NPM installed modules (managed with package-lock/package.json).  
  
init_database.js: A script used to initialize both the skills and users tables.
  
index.js: Manages all Express server, middleware, and routing setup.  
.env: Holds private variables. 
  
routes:  
  
    skills.js: Manages all GET routes related to skills data, including skills frequencies.  
      
    users.js: Manages all GET/PUT routes for all or individual user information.  
    
    registration.js: Manages all POST/DELETE routes for user registration.  
    
    scan.js: Manages all GET/PUT routes for users scan events to account. 
      
database:  
  
    skills.db: Holds all skills with associated scores for each individual. Each column is a documented skill, and each row is a user with their column representing their corresponding rating for the skill.  
      
    users.db: Holds all user information. Columns contain user information, including first name, last name, company, email, and phone number. Skills are held within the skills.db table, with each row ID corresponding to the users.db user ID.  
