require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port  = process.env.PORT;
const db = process.env.DB;
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
//database 
mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(() => {
        console.log(`Database connected at ${db}`);
    })
    .catch(err => {
        throw(err)
    })

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('dev'));

/* cors setting */

var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

/* To test the app */

app.use(express.static("client/build"));

app.get("*", (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../client/build') });
});

app.listen(port,()=> console.log('App is running at:' + port))