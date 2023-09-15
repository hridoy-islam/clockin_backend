const mongoose = require('mongoose')

const workerSchema = mongoose.Schema({
    name: String,
    phone: String,
    password: String,
    otp: String,
    holidays: Number,
    verified: Boolean,
}, { timestamps: true });

const Worker = mongoose.model("Worker", workerSchema);

module.exports = Worker;