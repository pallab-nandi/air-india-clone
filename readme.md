<div align="center"><img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgYBX6nG4CKCwUY6VNzo1IKmQggqhT4ly3kofiLCfYDOqXBvcQ1DEYX6f5wz4WNjHkD8c0wssceTJduBQXToAg2Ob-XHMQirNSuzCR6JXrs5RfBnjDo4-xBNvBof3nYJgJl1zNa-QwXw-hBY1T7Zm5AObDhrl45t_2nn4ojnreU3VY8W6vFdRIc12_J2g/w282-h320/air-india-clone2.png"></div>
<h1 align="center">Air-India-Clone BackEnd App</h1>
<p align="center">
    <strong><u>Description</u></strong>
    <br>A Project on Airline Ticket Booking Back-End System<br>
    <b>Project Title : </b>Air-India-Clone BackEnd App<br>
    <b>Project by : </b><a href="https://github.com/pallab-nandi">Pallab Nandi</a>
</p>
<br/>
<h2>About</h2>
A BackEnd application for ticket booking system built on MVC(Model-View-Controller) architecture. The technologies uses on this application are - <b>NodeJS</b>, <b>ExpressJS</b>, <b>bcryptJS</b>, <b>Mongoose</b> and <b>passportJS</b>. This application uses <b>MongoDB</b> technology to interact with DataBase. Important key features this application contains are :-

<br>

- User SignUp and LogIn feature
- Ticket Booking System
- Review System on Journey
- Airlines, Flights and Users CRUD operation for Admin only
- uses <b>JWT</b> and <b>PassportJS</b> for Authorization and Authentication


<h2>API Documentation</h2>

The current project is deployed on the <b>cyclic.sh</b> platform. Therefore, the root directory for the API is <br>`pallabnandi-airindia-app.cyclic.app`

For Airlines CRUD operation, the common route is `/api/v1/airline` . Now the following operations are :

- `/all` - to fetch all airlines
- `/{name}` - to fetch according as Airline Name
- `/add` - to add new Airline (Only accessable by Admin)
- `/{name}/edit` - to update the specific Airline (Only accessable by Admin)
- `/{name}?delete=true` - to delete the specific Airline (Only accessable by Admin)

For Flights CRUD operation, the common route is `/api/v1/flight` . Now the following operations are :

- `/all` - to fetch all flights
- `/{name}` - to fetch according as Flight Name
- `/add` - to add new Flight (Only accessable by Admin)
- `/{name}/edit` - to update the specific Flight (Only accessable by Admin)
- `/{name}?delete=true` - to delete the specific Flight (Only accessable by Admin)
<br><br></t><u>For Searching and Filters:</u>

- `?sort={Sort Parameter}&sortType={asc/desc}` - To sort the result according as ascending or descending
- `?minPrice={price}` - To get according as minimum Price
- `?maxPrice={price}` - To get according as maximum Price
- `?parameter={name}` - To get according as airline or flight-name or arrival or departure airport as parameter and with their name to filter

<br>For Users CRUD operation, the common route is `/api/v1/user` . Now the following operations are :

- `/all` - to fetch all users (Only accessable by Admin)
- `/add` - to add all users (Only accessable by Admin)
- `/{username}/edit` - to update the specific user (Only accessable by Admin)
- `/{username}?delete=true` - to delete the specific user (Only accessable by Admin)
<br><br></t><u>For Searching and Filters:</u>

- `?parameter={name}` - To filter the result according as parameter (name, username, email) with name

For Ticket CRUD operation, the common route is `/api/v1/ticket` . Now the following operations are :

- `/all` - to fetch all Tickets with status 'In-Process', 'Booked' or 'Cancelled' (Only accessably by Authenticate User)
- `/view?status={type}` - to fetch all Tickets with status type (Only accessably by Authenticate User)
- `/add` - to book new Ticket (Only accessable by Authenticate User)
- `/{id}` - to get the Ticket by ID (Only accessable by Authenticate User)
- `/{id}/edit` - to update the specific ticket (Only accessable by Admin)
- `/{id}?cancel=true` - to cancel the ticket by Authentic user
- `/{id}?delete=true` - to delete the specific category (Only accessable by Admin)
<br><br></t><u>For Searching and Filters:</u>

- `?sort={Sort Parameter}&sortType={asc/desc}` - To sort the result according as ascending or descending
- `?minPrice={price}` - To get according as minimum Price
- `?maxPrice={price}` - To get according as maximum Price
- `?parameter={name}` - To get according as airline or flight-name or departure date as parameter and with their data to filter

For Review CRUD operation, the common route is `/api/v1/review` . Now the following operations are :

- `/all` - to fetch all Reviews
- `/{ticketID}/add` - to add new Review (Only accessable by Authenticate User)
- `/{id}` - to get the Review by ID (Only accessable by Authenticate User)
- `/{id}/edit` - to update the specific review (Only accessable by Authenticate User)
- `/{id}?delete=true` - to delete the specific category (Only accessable by Authenticate User)
<br><br></t><u>For Searching and Filters:</u>

- `?sort={Sort Parameter}&sortType={asc/desc}` - To sort the result according as ascending or descending
- `?minRating={price}` - To get according as minimum Rating
- `?maxRating={price}` - To get according as maximum Rating
- `?flight={name}` - To get according as flight

For Auth, the common route is `/api/v1/auth` . Now the following operations are :

- `/signup` - to register self as new user.
- `/login` - to login self.


<h2>Clone the application on Local System</h2>

To clone the application on the local system, one must go through these prerequisite -

1. Must have <b>Git</b> install on the system
2. Technology needed to run the app - <b>NodeJS</b>
3. And <b>MongoDB</b> should be installed on the system

If one follows these prerequisite, then proceed the step as follow

- Open Terminal (on MAC or Linux) or Git Bash (on Windows) and run the following command - <br>`git clone https://github.com/pallab-nandi/ecommerce-be-app.git`

<div align="center"><img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizsocJgdaw8b3fhViyJRbdgqSDDxOtE45HuvEsoMA1skCiLxwJW1xDnJFrFDzeHLiY_-uCq8-VG3q_d3W1mjW_Oo3opkV4BYHF2q4ypZqNpCQ72DYDEFluCsVOCbTFqpA-WpuPuQ8Zb43TXj3YNXXVWVELvRHxo6OKphFeFkoQH1ntjv33VrVKxO1kwg/w640-h261/clone.png"></div>

- Now go to Project directory and run `npm install` command to install necessary dependencies.

<div align="center"><img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgDlhy4lHVmf97AnolHGFKotwbIeo7M7x50UYB4_667q2WY1zBTvQG_y4dhclGCyf1cMGp6QbgGOtSXhUfCE0exDiDDKzZOvZCl0DkPE6nvCVh5j7KSdyEejSKO8kKxKnfLENTUQt6Z9ZlqUUJknbEvk7u0lkbPs68pdvBW4pYss_M5Gw9-oYzT0fx84Q/w640-h400/npm-install.png"></div>

- With everything ready just run the command `node ./index.js` or `npm start` to start the application.

<div align="center"><img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhiCoXntC1eCoIWtIi_-cwxAvEa8ozfZjw1xCGX0tZptREtLYq9dkj5pHE3Hm1hUI-KuNNy2jNMUApdi1C-MizqIswr9c1ZQD-8XZB72Vm57McuB1Qn_rBXgG3ZuDtFjooWRIJEduaMER_xBH-jzpyHm5xLk2AYubGNmZfWqojPKjCao6u2Ra2PCpgoKw/w640-h178/npm-run.png"></div><br>

<b>Note :</b> Before starting application change `dbConfig.prodcution` into `dbConfig.development` in `connections/mongodb.connect.js` file so that it wouldn't hamper with the production database. And do change the necessary details in `config/config.json` file to connect with the local database.


<h2>Project Version</h2>

The current version of the application is `v1.0.0`
