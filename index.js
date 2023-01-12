const express = require('express');
const colors = require('colors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');


const serverConfig = require('./src/configs/server.config');
const { connect } = require('./src/connections/mongodb.connect');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(morgan('tiny'));

//passport initialize
app.use(passport.initialize());

// routing
require('./routes/index.routes')(app);


app.get('/', (req, res) => {
    console.log('Hello World'.bold.green);
    res.status(200).sendFile(path.join(__dirname, './src/public/index.html'));
})


//Running the application server

app.listen(serverConfig.PORT, () => {
    console.log(`Application is running on PORT : ${serverConfig.PORT}...`.bold.cyan);
    connect(); //Initializing Database Connection
})