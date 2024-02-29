const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser=require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');


const hospitals = require ('./routes/hospitals');
const appointments = require('./routes/appointments');
const auth = require('./routes/auth');
//load env vars
dotenv.config({path:'./config/config.env'});

//connect datebase
connectDB();



const app = express();
//Body parser
app.use(express.json());
app.use(cookieParser());
//Sanitize data
app.use(mongoSanitize());

app.use('/api/v1/hospitals', hospitals);
app.use('/api/v1/auth',auth);
app.use('/api/v1/appointments', appointments);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log('Sever running in ', process.env.NODE_ENV, ' mode on port ', PORT));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err,promise) => {
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(() => process.exit(1));    
})
