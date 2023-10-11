const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require('./common/mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
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
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
connectDB()

app.use('/auth', authRoute);
app.use('/company', companyRoute);
app.use('/customer', customerRoute);
app.use('/worker', workerRoute);
app.use('/tasklist', taskListRoute);
app.use('/service', serviceRoute);
app.use('/profile', express.static('upload/images'));

app.get('/', (req, res) => {
    res.send('Hello Clock IN APP!')
})
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

const server = app.listen(port, () => {
    console.log(`Server is running: ${port}`);
});

module.exports = { app };