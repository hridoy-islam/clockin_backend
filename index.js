const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require('./common/mongoose');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoute = require('./Route/authRoute')
const companyRoute = require('./Route/companyRoute')
const taskListRoute = require('./Route/taskListRoute')
const serviceRoute = require('./Route/serviceRoute')
const customerRoute = require('./Route/customerRoute')
const workerRoute = require('./Route/workerRoute')

// middleware
app.use(cors(

));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoute);

app.use('/company', companyRoute);
app.use('/customer', customerRoute);
app.use('/worker', workerRoute);
app.use('/tasklist', taskListRoute);
app.use('/service', serviceRoute);
connectDB()


app.get('/', (req, res) => {
    res.send('Hello Clock IN APP!')
})

const server = app.listen(port, () => {
    console.log(`Server is running: ${port}`);
});

module.exports = { app };